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
  UserIcon,
  CalendarIcon,
  PrinterIcon,
  FlagIcon,
  StarIcon // Added missing import
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

const mockArticle: Article = {
  id: '1',
  title: 'Getting Started with Modern CRM Systems: A Comprehensive Guide',
  excerpt: 'Learn how to implement and optimize customer relationship management systems for your business growth and customer satisfaction.',
  content: `# Introduction

Customer Relationship Management (CRM) systems have become the backbone of modern businesses. In today's competitive landscape, maintaining strong relationships with customers is not just important—it's essential for survival and growth.

## What is a CRM System?

A CRM system is a technology platform that helps businesses manage all aspects of their customer relationships. It centralizes customer information, tracks interactions, and provides insights that help teams work more effectively.

### Key Benefits of CRM

- Improved Customer Relationships: Better tracking of customer interactions
- Increased Sales: More efficient sales processes and pipeline management
- Enhanced Customer Service: Quick access to customer history and preferences
- Data-Driven Decisions: Analytics and reporting for strategic planning

## Choosing the Right CRM

When selecting a CRM system, consider these factors:

1. Business Size and Needs
2. Integration Capabilities
3. User-Friendly Interface
4. Scalability
5. Cost and ROI

### Implementation Best Practices

> The success of a CRM implementation depends not just on the technology, but on how well your team adopts and uses it.

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
    content: 'Great article! I especially appreciate the implementation best practices section. We are currently evaluating CRM systems for our startup.',
    createdAt: '2024-06-02T14:30:00Z',
    likes: 5,
    replies: [
      {
        id: '1-1',
        author: { name: 'Sarah Davis' },
        createdAt: '2024-06-02T15:15:00Z',
        content: 'Thanks Alex! For startups, I d recommend starting with a simple solution and scaling up as you grow. Feel free to reach out if you need specific recommendations.',
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
  const [showComments] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // Загрузка данных статьи
  useEffect(() => {
    const loadArticle = async () => {
      try {
        // В реальном приложении здесь был бы API запрос
        // const response = await fetch(`/api/articles/${params.id}`);
        // const articleData = await response.json();
        
        // Используем mock данные
        setTimeout(() => {
          setArticle(mockArticle);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error loading article:', error);
        setLoading(false);
      }
    };

    if (params?.id) {
      loadArticle();
    }
  }, [params?.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Fixed content formatting function
  const formatContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];
    let listType: 'ul' | 'ol' | null = null;
    let listIndex = 0;

    const flushList = () => {
      if (currentList.length > 0 && listType) {
        if (listType === 'ul') {
          elements.push(
            <ul key={`list-${listIndex++}`} className="list-disc list-inside my-4 space-y-1">
              {currentList}
            </ul>
          );
        } else {
          elements.push(
            <ol key={`list-${listIndex++}`} className="list-decimal list-inside my-4 space-y-1">
              {currentList}
            </ol>
          );
        }
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={`h1-${index}`} className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith('> ')) {
        flushList();
        elements.push(
          <blockquote key={`quote-${index}`} className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400 bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-r-lg">
            {line.slice(2)}
          </blockquote>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        flushList();
        elements.push(
          <p key={`bold-${index}`} className="font-bold my-2 text-gray-900 dark:text-white">
            {line.slice(2, -2)}
          </p>
        );
      } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
        flushList();
        elements.push(
          <p key={`italic-${index}`} className="italic my-2 text-gray-700 dark:text-gray-300">
            {line.slice(1, -1)}
          </p>
        );
      } else if (line.startsWith('- ')) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        currentList.push(
          <li key={`ul-${index}`} className="text-gray-700 dark:text-gray-300">
            {line.slice(2)}
          </li>
        );
      } else if (line.match(/^\d+\. /)) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        currentList.push(
          <li key={`ol-${index}`} className="text-gray-700 dark:text-gray-300">
            {line.replace(/^\d+\. /, '')}
          </li>
        );
      } else if (line.trim() === '') {
        flushList();
        elements.push(<br key={`br-${index}`} />);
      } else if (line.trim() !== '') {
        flushList();
        elements.push(
          <p key={`p-${index}`} className="my-3 leading-relaxed text-gray-700 dark:text-gray-300">
            {line}
          </p>
        );
      }
    });

    flushList(); // Flush any remaining list items
    return elements;
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    
    // В реальном приложении здесь был бы API запрос
    console.log('Submitting comment:', newComment);
    setNewComment('');
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading article...</p>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Article not found</p>
          <Link href="/articles">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to Articles
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16">
      <div className="max-w-6xl mx-auto p-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link href="/articles">
            <motion.button
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Articles</span>
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <GlassCard delay={0.1}>
              {/* Article Header */}
              <div className="mb-8">
                {article.featured && (
                  <div className="flex items-center space-x-2 mb-4">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Featured Article</span>
                  </div>
                )}
                
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {article.title}
                </h1>
                
                {article.excerpt && (
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                )}

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-200/50 dark:border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {article.author.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {article.author.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {article.author.bio}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm">{formatDate(article.publishedAt)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-sm">{article.readTime} min read</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <EyeIcon className="w-4 h-4" />
                    <span className="text-sm">{article.views} views</span>
                  </div>
                </div>

                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full"
                      >
                        <TagIcon className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {formatContent(article.content)}
              </div>

              {/* Article Actions */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked 
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400 hover:bg-red-100 hover:text-red-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HeartIcon className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{article.likes + (isLiked ? 1 : 0)}</span>
                  </motion.button>

                  <motion.button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isBookmarked 
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <BookmarkIcon className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span>Save</span>
                  </motion.button>

                  <motion.button
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShareIcon className="w-5 h-5" />
                    <span>Share</span>
                  </motion.button>
                </div>

                <div className="flex items-center space-x-2">
                  <Link href={`/articles/${article.id}/edit`}>
                    <motion.button
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <PencilIcon className="w-4 h-4" />
                      <span>Edit</span>
                    </motion.button>
                  </Link>

                  <motion.button
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <PrinterIcon className="w-5 h-5" />
                  </motion.button>

                  <motion.button
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FlagIcon className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </GlassCard>

            {/* Comments Section */}
            {showComments && (
              <GlassCard title="Discussion" delay={0.3} className="mt-8">
                {/* Add Comment */}
                <div className="mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add your thoughts on this article..."
                        rows={3}
                        className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      />
                      <div className="flex justify-end mt-2">
                        <motion.button
                          onClick={handleCommentSubmit}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: newComment.trim() ? 1.05 : 1 }}
                          disabled={!newComment.trim()}
                        >
                          Post Comment
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {mockComments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      className="border-l-2 border-gray-200 dark:border-slate-700 pl-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">
                            {comment.author.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {comment.author.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">
                            {comment.content}
                          </p>
                          <div className="flex items-center space-x-4">
                            <motion.button
                              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-600"
                              whileHover={{ scale: 1.05 }}
                            >
                              <HeartIcon className="w-4 h-4" />
                              <span>{comment.likes}</span>
                            </motion.button>
                            <motion.button
                              className="text-sm text-gray-500 hover:text-blue-600"
                              whileHover={{ scale: 1.05 }}
                            >
                              Reply
                            </motion.button>
                          </div>

                          {/* Nested Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-4 space-y-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start space-x-3">
                                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-xs">
                                      {reply.author.name.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                                        {reply.author.name}
                                      </span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatDate(reply.createdAt)}
                                      </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                      {reply.content}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Article Info */}
            <GlassCard title="Article Info" delay={0.2}>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 capitalize">
                    {article.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                  <p className="font-medium text-gray-900 dark:text-white">{article.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reading Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{article.readTime} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Views</p>
                  <p className="font-medium text-gray-900 dark:text-white">{article.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Likes</p>
                  <p className="font-medium text-gray-900 dark:text-white">{article.likes}</p>
                </div>
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard title="Quick Actions" delay={0.3}>
              <div className="space-y-3">
                <Link href={`/articles/${article.id}/edit`}>
                  <motion.button
                    className="w-full py-2 px-4 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-lg transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                  >
                    ✏️ Edit Article
                  </motion.button>
                </Link>
                <motion.button
                  className="w-full py-2 px-4 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300 rounded-lg transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  🌐 View Live
                </motion.button>
                <motion.button
                  className="w-full py-2 px-4 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-lg transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  📊 Analytics
                </motion.button>
                <motion.button
                  className="w-full py-2 px-4 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 text-purple-800 dark:text-purple-300 rounded-lg transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  📤 Share
                </motion.button>
              </div>
            </GlassCard>

            {/* Related Articles */}
            <GlassCard title="Related Articles" delay={0.4}>
              <div className="space-y-4">
                {relatedArticles.map((related, index) => (
                  <motion.div
                    key={related.id}
                    className="p-3 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg hover:bg-gray-100/50 dark:hover:bg-slate-600/50 transition-colors cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link href={`/articles/${related.id}`}>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                        {related.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{related.author}</span>
                        <span>{related.readTime} min</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}