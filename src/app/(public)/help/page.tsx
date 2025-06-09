// src/app/help/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { 
  QuestionMarkCircleIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CogIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CalendarIcon,
  FolderIcon,
  PlayIcon,
  ChevronRightIcon,
  StarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface HelpArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  popularity: number;
  lastUpdated: string;
  type: 'article' | 'video' | 'tutorial';
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

const helpArticles: HelpArticle[] = [
  {
    id: '1',
    title: 'Getting Started with Brama CRM',
    description: 'Learn the basics of navigating and using your CRM dashboard effectively',
    category: 'Getting Started',
    readTime: 5,
    popularity: 95,
    lastUpdated: '2024-06-01',
    type: 'tutorial'
  },
  {
    id: '2',
    title: 'Managing Leads and Contacts',
    description: 'Complete guide to adding, organizing, and tracking your leads',
    category: 'Leads',
    readTime: 8,
    popularity: 88,
    lastUpdated: '2024-05-28',
    type: 'article'
  },
  {
    id: '3',
    title: 'Project Management Best Practices',
    description: 'Tips and strategies for managing projects efficiently in your CRM',
    category: 'Projects',
    readTime: 12,
    popularity: 76,
    lastUpdated: '2024-05-25',
    type: 'video'
  },
  {
    id: '4',
    title: 'Setting Up Team Permissions',
    description: 'How to configure user roles and permissions for your team members',
    category: 'Team Management',
    readTime: 6,
    popularity: 82,
    lastUpdated: '2024-05-20',
    type: 'article'
  },
  {
    id: '5',
    title: 'Understanding Analytics and Reports',
    description: 'Make data-driven decisions with comprehensive reporting features',
    category: 'Analytics',
    readTime: 10,
    popularity: 71,
    lastUpdated: '2024-05-15',
    type: 'tutorial'
  },
  {
    id: '6',
    title: 'Calendar Integration and Scheduling',
    description: 'Sync your calendar and manage appointments seamlessly',
    category: 'Calendar',
    readTime: 7,
    popularity: 69,
    lastUpdated: '2024-05-10',
    type: 'article'
  }
];

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I add a new lead to the system?',
    answer: 'To add a new lead, navigate to the Leads section and click the "Add New Lead" button. Fill in the required information including name, email, phone, and source. You can also add additional details like UTM parameters and assign the lead to a team member.',
    category: 'Leads',
    helpful: 45
  },
  {
    id: '2',
    question: 'Can I customize the dashboard layout?',
    answer: 'Yes, you can customize your dashboard by rearranging widgets, adding or removing cards, and adjusting the layout to suit your workflow. Go to Settings > Dashboard Preferences to make these changes.',
    category: 'Dashboard',
    helpful: 38
  },
  {
    id: '3',
    question: 'How do I export my data?',
    answer: 'You can export your data from various sections of the CRM. Look for the "Export" button in the top-right corner of lists and tables. You can export to CSV, Excel, or PDF formats depending on the data type.',
    category: 'Data Management',
    helpful: 52
  },
  {
    id: '4',
    question: 'What are the different user roles available?',
    answer: 'Brama CRM offers several user roles: Admin (full access), Manager (team management), Sales Rep (lead management), and Viewer (read-only access). Each role has specific permissions tailored to common job functions.',
    category: 'User Management',
    helpful: 33
  },
  {
    id: '5',
    question: 'How do I set up automated workflows?',
    answer: 'Automated workflows can be configured in Settings > Automation. You can create rules based on lead status changes, time triggers, or specific actions. Common workflows include follow-up reminders and lead scoring.',
    category: 'Automation',
    helpful: 41
  }
];

const categories = [
  { name: 'Getting Started', icon: BookOpenIcon, color: 'from-blue-500 to-blue-600', count: 8 },
  { name: 'Leads', icon: UserGroupIcon, color: 'from-green-500 to-green-600', count: 12 },
  { name: 'Projects', icon: FolderIcon, color: 'from-purple-500 to-purple-600', count: 6 },
  { name: 'Team Management', icon: UserGroupIcon, color: 'from-orange-500 to-orange-600', count: 4 },
  { name: 'Analytics', icon: ChartBarIcon, color: 'from-pink-500 to-pink-600', count: 7 },
  { name: 'Calendar', icon: CalendarIcon, color: 'from-indigo-500 to-indigo-600', count: 3 },
  { name: 'Settings', icon: CogIcon, color: 'from-gray-500 to-gray-600', count: 9 },
  { name: 'Security', icon: ShieldCheckIcon, color: 'from-red-500 to-red-600', count: 5 }
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return VideoCameraIcon;
      case 'tutorial': return PlayIcon;
      default: return DocumentTextIcon;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16">
      <div className="p-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/">
            <motion.button
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </motion.button>
          </Link>

          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <QuestionMarkCircleIcon className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Help Center
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Find answers, guides, and support for Brama CRM
            </p>
          </div>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-xl p-6 hover:scale-105 transition-transform duration-200 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Live Chat</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get instant help from our support team</p>
                </div>
              </div>
              <motion.button
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
              >
                Start Chat
              </motion.button>
            </motion.div>

            <motion.div
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-xl p-6 hover:scale-105 transition-transform duration-200 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <VideoCameraIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Video Tutorials</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Watch step-by-step video guides</p>
                </div>
              </div>
              <motion.button
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
              >
                Watch Videos
              </motion.button>
            </motion.div>

            <motion.div
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-xl p-6 hover:scale-105 transition-transform duration-200 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Documentation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Browse comprehensive guides</p>
                </div>
              </div>
              <motion.button
                className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
              >
                Read Docs
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    selectedCategory === category.name
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white/70 dark:bg-slate-800/70 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`p-2 rounded-lg mb-3 w-fit ${
                    selectedCategory === category.name
                      ? 'bg-white/20'
                      : `bg-gradient-to-br ${category.color}`
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      selectedCategory === category.name ? 'text-white' : 'text-white'
                    }`} />
                  </div>
                  <h3 className={`font-medium mb-1 ${
                    selectedCategory === category.name
                      ? 'text-white'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm ${
                    selectedCategory === category.name
                      ? 'text-blue-100'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.count} articles
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Help Articles */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {selectedCategory === 'all' ? 'Popular Articles' : `${selectedCategory} Articles`}
            </h2>
            <div className="space-y-4">
              {filteredArticles.map((article, index) => {
                const TypeIcon = getTypeIcon(article.type);
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <GlassCard animate={false} className="hover:scale-[1.02] transition-transform duration-200 cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <TypeIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {article.title}
                            </h3>
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            {article.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              {article.readTime} min read
                            </div>
                            <div className="flex items-center">
                              <StarIcon className="w-3 h-3 mr-1" />
                              {article.popularity}% helpful
                            </div>
                            <span>{article.category}</span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <GlassCard animate={false}>
                    <motion.button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full text-left"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: expandedFAQ === faq.id ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </div>
                    </motion.button>
                    
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-gray-200/50 dark:border-slate-700/50"
                      >
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {faq.helpful} people found this helpful
                          </span>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              className="text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-1 rounded transition-colors"
                              whileHover={{ scale: 1.05 }}
                            >
                              👍 Helpful
                            </motion.button>
                            <motion.button
                              className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-colors"
                              whileHover={{ scale: 1.05 }}
                            >
                              👎 Not helpful
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <GlassCard>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Still need help?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Support
                </motion.button>
                <motion.button
                  className="px-6 py-3 bg-white/70 dark:bg-slate-800/70 text-gray-700 dark:text-gray-300 rounded-xl font-medium border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  );
}