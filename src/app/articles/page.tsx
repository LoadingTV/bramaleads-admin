// src/app/articles/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { 
  PlusIcon, 
  DocumentTextIcon, 
  EyeIcon,
  TagIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  BookmarkIcon,
  CalendarIcon,
  GlobeAltIcon,
  LinkIcon,
  FolderIcon
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
  };
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  project: {
    id: string;
    name: string;
    domain?: string;
  };
  category: string;
  tags: string[];
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  readTime: number;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with CRM Implementation',
    excerpt: 'A comprehensive guide to implementing CRM systems in your organization for better customer management.',
    content: 'Full article content here...',
    author: { name: 'Sarah Davis', id: '1' },
    status: 'published',
    project: { id: 'proj1', name: 'TechSolutions Blog', domain: 'blog.techsolutions.com' },
    category: 'Guides',
    tags: ['CRM', 'Implementation', 'Business'],
    publishedAt: '2024-06-01T10:00:00Z',
    createdAt: '2024-05-28T09:00:00Z',
    updatedAt: '2024-06-01T09:55:00Z',
    readTime: 8,
    featured: true,
    slug: 'getting-started-crm-implementation',
    seoTitle: 'CRM Implementation Guide 2024 | TechSolutions',
    seoDescription: 'Learn how to implement CRM systems effectively with our step-by-step guide.'
  },
  {
    id: '2',
    title: 'Best Practices for Lead Management',
    excerpt: 'Discover proven strategies for managing and converting leads in modern sales environments.',
    content: 'Full article content here...',
    author: { name: 'Alex Johnson', id: '2' },
    status: 'draft',
    project: { id: 'proj1', name: 'TechSolutions Blog', domain: 'blog.techsolutions.com' },
    category: 'Sales',
    tags: ['Lead Management', 'Sales', 'Strategy'],
    createdAt: '2024-06-05T08:00:00Z',
    updatedAt: '2024-06-07T16:30:00Z',
    readTime: 12,
    featured: false,
    slug: 'lead-management-best-practices'
  },
  {
    id: '3',
    title: 'Customer Analytics Deep Dive',
    excerpt: 'How to leverage customer data and analytics to make informed business decisions.',
    content: 'Full article content here...',
    author: { name: 'Emily Rodriguez', id: '4' },
    status: 'scheduled',
    project: { id: 'proj2', name: 'Business Analytics Hub', domain: 'analytics.businesshub.io' },
    category: 'Analytics',
    tags: ['Analytics', 'Data', 'Customer Insights'],
    scheduledAt: '2024-06-15T09:00:00Z',
    createdAt: '2024-06-08T09:00:00Z',
    updatedAt: '2024-06-08T14:30:00Z',
    readTime: 15,
    featured: true,
    slug: 'customer-analytics-deep-dive'
  }
];

const STATUS_CONFIG = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300', icon: PencilIcon },
  published: { label: 'Published', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', icon: EyeIcon },
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', icon: CalendarIcon },
  archived: { label: 'Archived', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', icon: BookmarkIcon },
};

const CATEGORIES = ['All', 'Guides', 'Sales', 'Analytics', 'Marketing', 'Technology', 'Business Strategy'];

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
    const matchesProject = selectedProject === 'all' || article.project.id === selectedProject;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesProject;
  });

  const stats = {
    total: mockArticles.length,
    published: mockArticles.filter(a => a.status === 'published').length,
    drafts: mockArticles.filter(a => a.status === 'draft').length,
    scheduled: mockArticles.filter(a => a.status === 'scheduled').length,
    featured: mockArticles.filter(a => a.featured).length,
  };

  const projects = Array.from(new Set(mockArticles.map(a => a.project.id)))
    .map(id => mockArticles.find(a => a.project.id === id)?.project)
    .filter(Boolean);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Content Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Create and manage articles for your projects websites and blogs
              </p>
            </div>
            <Link href="/articles/create">
              <motion.button
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlusIcon className="w-5 h-5" />
                <span>New Article</span>
              </motion.button>
            </Link>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {[
              { title: 'Total Articles', value: stats.total, icon: DocumentTextIcon, color: 'from-blue-500 to-blue-600' },
              { title: 'Published', value: stats.published, icon: EyeIcon, color: 'from-green-500 to-green-600' },
              { title: 'Drafts', value: stats.drafts, icon: PencilIcon, color: 'from-yellow-500 to-yellow-600' },
              { title: 'Scheduled', value: stats.scheduled, icon: CalendarIcon, color: 'from-blue-500 to-purple-600' },
              { title: 'Featured', value: stats.featured, icon: StarIcon, color: 'from-purple-500 to-purple-600' },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-xl p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`p-2 bg-gradient-to-br ${stat.color} rounded-lg`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Project Filter */}
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="px-4 py-2 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Projects</option>
                {projects.map(project => (
                  <option key={project?.id} value={project?.id}>{project?.name}</option>
                ))}
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/70 dark:bg-slate-800/70 rounded-lg p-1">
              {(['grid', 'table'] as const).map((mode) => (
                <motion.button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition-all ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {mode}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Articles Grid/Table */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => {
              const StatusIcon = STATUS_CONFIG[article.status].icon;
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <GlassCard animate={false} className="h-full hover:scale-105 transition-transform duration-200 cursor-pointer">
                    {/* Article Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[article.status].color}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {STATUS_CONFIG[article.status].label}
                        </span>
                        {article.featured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                            <StarIcon className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <motion.button
                          className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 rounded"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Link href={`/articles/${article.id}/edit`}>
                            <PencilIcon className="w-4 h-4" />
                          </Link>
                        </motion.button>
                        <motion.button
                          className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded"
                          whileHover={{ scale: 1.1 }}
                        >
                          <TrashIcon className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex items-center space-x-2 mb-3">
                      <FolderIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{article.project.name}</span>
                      {article.project.domain && (
                        <div className="flex items-center space-x-1">
                          <GlobeAltIcon className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{article.project.domain}</span>
                        </div>
                      )}
                    </div>

                    {/* Article Content */}
                    <Link href={`/articles/${article.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    </Link>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded"
                        >
                          <TagIcon className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-slate-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">
                            {article.author.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {article.author.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {article.publishedAt ? formatDate(article.publishedAt) : 
                             article.scheduledAt ? `Scheduled: ${formatDate(article.scheduledAt)}` :
                             formatDate(article.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {article.readTime} min read
                        </p>
                        {article.status === 'published' && article.project.domain && (
                          <motion.button
                            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center mt-1"
                            whileHover={{ scale: 1.05 }}
                          >
                            <LinkIcon className="w-3 h-3 mr-1" />
                            View Live
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <>
            <GlassCard delay={0.4}>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200/50 dark:border-slate-700/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Article</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Author</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50 dark:divide-slate-700/50">
                    {filteredArticles.map((article) => (
                      <tr
                        key={article.id}
                        className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-3">
                            {article.featured && (
                              <StarIcon className="w-4 h-4 text-yellow-500 mt-1" />
                            )}
                            <div>
                              <Link href={`/articles/${article.id}`}>
                                <p className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                  {article.title}
                                </p>
                              </Link>
                              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                {article.excerpt}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{article.project.name}</p>
                            {article.project.domain && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">{article.project.domain}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-xs">
                                {article.author.name.charAt(0)}
                              </span>
                            </div>
                            <span className="text-sm text-gray-900 dark:text-white">{article.author.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded">
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${STATUS_CONFIG[article.status].color}`}>
                            {STATUS_CONFIG[article.status].label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {article.publishedAt ? formatDate(article.publishedAt) : 
                           article.scheduledAt ? formatDate(article.scheduledAt) :
                           formatDate(article.updatedAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Link href={`/articles/${article.id}`}>
                              <motion.button
                                className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                                whileHover={{ scale: 1.1 }}
                              >
                                <EyeIcon className="w-4 h-4" />
                              </motion.button>
                            </Link>
                            <Link href={`/articles/${article.id}/edit`}>
                              <motion.button
                                className="p-1.5 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                whileHover={{ scale: 1.1 }}
                              >
                                <PencilIcon className="w-4 h-4" />
                              </motion.button>
                            </Link>
                            {article.status === 'published' && article.project.domain && (
                              <motion.button
                                className="p-1.5 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                                whileHover={{ scale: 1.1 }}
                                title="View Live"
                              >
                                <LinkIcon className="w-4 h-4" />
                              </motion.button>
                            )}
                            <motion.button
                              className="p-1.5 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                              whileHover={{ scale: 1.1 }}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <DocumentTextIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No articles found</p>
              <p className="text-gray-400 dark:text-gray-500 mb-4">Create your first article for your projects</p>
              <Link href="/articles/create">
                <motion.button
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Create First Article</span>
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
}