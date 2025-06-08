// src/app/articles/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import GlassCard from '@/components/GlassCard';
import { 
  ArrowLeftIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TagIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  CalendarIcon,
  LinkIcon,
  PrinterIcon,
  FlagIcon
} from '@heroicons/react/24/outline';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    id: string;
    bio?: string;
  };
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  likes: number;
  featured: boolean;
  coverImage?: string;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

// Mock data - в реальном приложении это будет загружаться из API
const mockArticle: Article = {
  id: '1',
  title: 'Getting Started with Modern CRM Systems: A Comprehensive Guide',
  excerpt: 'Learn how to implement and optimize customer relationship management systems for your business growth and customer satisfaction.',
  content: `# Introduction

Customer Relationship Management (CRM) systems have become the backbone of modern businesses. In today's competitive landscape, maintaining strong relationships with customers is not just important—it's essential for survival and growth.

## What is a CRM System?

A CRM system is a technology platform that helps businesses manage all aspects of their customer relationships. It centralizes customer information, tracks interactions, and provides insights that help teams work more effectively.

### Key Benefits of CRM

- **Improved Customer Relationships**: Better tracking of customer interactions
- **Increased Sales**: More efficient sales processes and pipeline management
- **Enhanced Customer Service**: Quick access to customer history and preferences
- **Data-Driven Decisions**: Analytics and reporting for strategic planning

## Choosing the Right CRM

When selecting a CRM system, consider these factors:

1. **Business Size and Needs**
2. **Integration Capabilities**
3. **User-Friendly Interface**
4. **Scalability**
5. **Cost and ROI**

### Implementation Best Practices

> "The success of a CRM implementation depends not just on the technology, but on how well your team adopts and uses it."

**Step 1: Define Your Goals**
Start with clear objectives for what you want to achieve with your CRM.

**Step 2: Clean Your Data**
Ensure your customer data is accurate and up-to-date before migration.

**Step 3: Train Your Team**
Invest in comprehensive training to ensure adoption.

**Step 4: Start Small**
Implement features gradually rather than all at once.

## Measuring Success

Track these key metrics to measure your CRM success:

- Customer satisfaction scores
- Sales conversion rates
- Average deal size
- Sales cycle length
- Customer retention rates

## Conclusion

Implementing a CRM system is a significant investment, but when done correctly, it can transform your business operations and customer relationships. Take the time to choose the right system and implement it properly for the best results.

*Remember: A CRM is only as good as the data you put into it and how well your team uses it.*`,
  author: {
    name: 'Sarah Davis',
    id: '1',
    bio: 'Senior Product Manager with 8+ years of experience in CRM systems and customer success strategies.'
  },
  status: 'published',
  category: 'CRM',
  tags: ['CRM', 'Business', 'Getting Started', 'Customer Success'],
  publishedAt: '2024-06-01T10:00:00Z',
  createdAt: '2024-05-28T09:00:00Z',
  updatedAt: '2024-06-01T09:55:00Z',
  readTime: 8,
  views: 1245,
  likes: 34,
  featured: true,
  coverImage: '/api/placeholder/800/400'
};

const mockComments: Comment[] = [
  {
    id: '1',
    author: { name: 'Alex Johnson' },
    content: 'Great article! I especially appreciate the implementation best practices section. We\'re currently evaluating CRM systems for our startup.',
    createdAt: '2024-06-02T14:30:00Z',
    likes: 5,
    replies: [
      {
        id: '1-1',
        author: { name: 'Sarah Davis' },
        content: 'Thanks Alex! For startups, I\'d recommend starting with a simple solution and scaling up as you grow. Feel free to reach out if you need specific recommendations.',
        createdAt: '2024-06-02T15:15:00Z',
        likes: 2
      }
    ]
  },
  {
    id: '2',
    author: { name: 'Mike Chen' },
    content: 'This is exactly what we needed! Our team has been struggling with customer data management. The step-by-step approach makes it much clearer.',
    createdAt: '2024-06-01T16:45:00Z',
    likes: 8
  },
  {
    id: '3',
    author: { name: 'Emily Rodriguez' },
    content: 'Would love to see a follow-up article about specific CRM features to look for in 2024.',
    createdAt: '2024-06-01T12:20:00Z',
    likes: 3
  }
];

const relatedArticles = [
  {
    id: '2',
    title: 'Advanced Lead Management Strategies',
    excerpt: 'Discover proven techniques for converting leads into customers.',
    readTime: 12,
    author: 'Alex Johnson'
  },
  {
    id: '4',
    title: 'Data Analytics for Business Growth',
    excerpt: 'How to leverage customer data for informed decisions.',
    readTime: 15,
    author: 'Emily Rodriguez'
  },
  {
    id: '5',
    title: 'Customer Retention Best Practices',
    excerpt: 'Proven strategies to keep customers engaged.',
    readTime: 10,
    author: 'Lisa Zhang'
  }
];

export default function ArticleViewPage() {
  const params = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState('');

  // In real app, you would fetch article data based on params.id
  const article = mockArticle;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{line.slice(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{line.slice(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-bold mt-4 mb-2">{line.slice(4)}</h3>;
        }
        if (line.startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400 bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-r-lg">
              {line.slice(2)}
            </blockquote>
          );
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-bold my-2">{line.slice(2, -2)}</p>;
        }
        if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
          return <p key={index} className="italic my-2">{line.slice(1, -1)}</p>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 my-1">{line.slice(2)}</li>;
        }
        if (line.match(/^\d+\. /)) {
          return <li key={index} className="ml-4 my-1 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="my-3 leading-relaxed">{line}</p>;
      });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16">
      <div className="max-w-6xl mx-auto p-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6