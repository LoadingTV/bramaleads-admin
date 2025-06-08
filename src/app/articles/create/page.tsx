// src/app/articles/create/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';
import { 
  ArrowLeftIcon,
  PhotoIcon,
  TagIcon,
  FolderIcon,
  EyeIcon,
  DocumentIcon,
  DocumentDuplicateIcon,
  PlusIcon,
  XMarkIcon,
  StarIcon,
  CalendarIcon,
  ClockIcon,
  GlobeAltIcon,
  LinkIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  projectId: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  featured: boolean;
  publishedAt?: string;
  scheduledAt?: string;
  coverImage?: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
}

interface Project {
  id: string;
  name: string;
  domain?: string;
  identifier: string;
}

const CATEGORIES = [
  'Guides',
  'Tutorials', 
  'Industry News',
  'Case Studies',
  'Best Practices',
  'Product Updates',
  'How-to',
  'Reviews',
  'Analysis'
];

const POPULAR_TAGS = [
  'Implementation', 'Strategy', 'Analytics', 'Automation', 
  'Best Practices', 'Guide', 'Tutorial', 'Tips',
  'Industry Trends', 'Case Study', 'ROI', 'Productivity'
];

// Mock projects - в реальном приложении загружается из API
const mockProjects: Project[] = [
  { id: 'proj1', name: 'TechSolutions Blog', domain: 'blog.techsolutions.com', identifier: 'techsolutions' },
  { id: 'proj2', name: 'Business Analytics Hub', domain: 'analytics.businesshub.io', identifier: 'analytics-hub' },
  { id: 'proj3', name: 'CRM Success Stories', domain: 'success.crmsoftware.pro', identifier: 'crm-success' },
  { id: 'proj4', name: 'Marketing Insights', identifier: 'marketing-insights' }, // No domain yet
];

export default function CreateArticlePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  
  const [formData, setFormData] = useState<ArticleForm>({
    title: '',
    excerpt: '',
    content: '',
    projectId: '',
    category: '',
    tags: [],
    status: 'draft',
    featured: false,
    publishedAt: '',
    scheduledAt: '',
    coverImage: '',
    slug: '',
    seoTitle: '',
    seoDescription: ''
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      handleInputChange('slug', slug);
    }
  }, [formData.title]);

  // Auto-generate SEO title if not set
  useEffect(() => {
    if (formData.title && !formData.seoTitle) {
      handleInputChange('seoTitle', formData.title);
    }
  }, [formData.title]);

  // Auto-generate SEO description if not set
  useEffect(() => {
    if (formData.excerpt && !formData.seoDescription) {
      handleInputChange('seoDescription', formData.excerpt);
    }
  }, [formData.excerpt]);

  const handleInputChange = (field: keyof ArticleForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      handleInputChange('tags', [...formData.tags, tag]);
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (status: 'draft' | 'published' | 'scheduled') => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.projectId) {
      alert('Title, content, and project selection are required');
      return;
    }

    if (status === 'scheduled' && !formData.scheduledAt) {
      alert('Please set a schedule date for scheduled publication');
      return;
    }

    setIsSubmitting(true);
    try {
      const articleData = {
        ...formData,
        status,
        publishedAt: status === 'published' ? new Date().toISOString() : undefined,
        scheduledAt: status === 'scheduled' ? formData.scheduledAt : undefined
      };

      // Here you would make API call to save the article
      console.log('Saving article:', articleData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`Article ${status === 'published' ? 'published' : status === 'scheduled' ? 'scheduled' : 'saved as draft'} successfully!`);
      router.push('/articles');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error saving article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedReadTime = Math.ceil(formData.content.split(' ').length / 200);
  const selectedProject = projects.find(p => p.id === formData.projectId);

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
          <Link href="/articles">
            <motion.button
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Articles</span>
            </motion.button>
          </Link>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Create New Article
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Write content for your project websites and blogs
              </p>
              {selectedProject && (
                <div className="flex items-center space-x-2 mt-2">
                  <FolderIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {selectedProject.name}
                  </span>
                  {selectedProject.domain && (
                    <div className="flex items-center space-x-1">
                      <GlobeAltIcon className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{selectedProject.domain}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => setPreviewMode(!previewMode)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <EyeIcon className="w-4 h-4" />
                <span>{previewMode ? 'Edit' : 'Preview'}</span>
              </motion.button>
              
              <motion.button
                onClick={() => handleSubmit('draft')}
                disabled={isSubmitting}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              >
                <DocumentDuplicateIcon className="w-4 h-4" />
                <span>Save Draft</span>
              </motion.button>

              <motion.button
                onClick={() => handleSubmit('scheduled')}
                disabled={isSubmitting || !formData.scheduledAt}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Schedule</span>
              </motion.button>
              
              <motion.button
                onClick={() => handleSubmit('published')}
                disabled={isSubmitting || !formData.title.trim() || !formData.content.trim() || !formData.projectId}
                className="inline-flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <DocumentIcon className="w-4 h-4" />
                    <span>Publish Now</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!previewMode ? (
              <>
                {/* Basic Info */}
                <GlassCard delay={0.1}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Article Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter an engaging title for your article..."
                        className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-medium"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Excerpt
                      </label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        placeholder="Write a brief description of your article..."
                        rows={3}
                        className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        URL Slug
                      </label>
                      <div className="flex items-center space-x-2">
                        {selectedProject?.domain && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedProject.domain}/
                          </span>
                        )}
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => handleInputChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          placeholder="article-url-slug"
                          className="flex-1 px-4 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Content Editor */}
                <GlassCard title="Article Content" delay={0.2}>
                  <div className="space-y-4">
                    {/* Toolbar */}
                    <div className="flex items-center space-x-2 p-3 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg border border-gray-200/50 dark:border-slate-600/50">
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded" title="Bold">
                        <strong>B</strong>
                      </button>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded" title="Italic">
                        <em>I</em>
                      </button>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded" title="Underline">
                        <u>U</u>
                      </button>
                      <div className="w-px h-6 bg-gray-300 dark:bg-slate-600"></div>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded" title="Heading">
                        H1
                      </button>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded" title="Link">
                        🔗
                      </button>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded" title="Image">
                        <PhotoIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-600 rounded" title="List">
                        📋
                      </button>
                    </div>

                    <textarea
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Start writing your article content here...

You can use Markdown syntax:
# Heading 1
## Heading 2
**Bold text**
*Italic text*
[Link text](url)
![Image alt](image-url)

- List item 1
- List item 2

> Quote block

```
Code block
```"
                      rows={20}
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none font-mono text-sm leading-relaxed"
                    />
                  </div>
                </GlassCard>

                {/* SEO Settings */}
                <GlassCard title="SEO Settings" delay={0.3}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        value={formData.seoTitle}
                        onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                        placeholder="SEO optimized title (60 characters max)"
                        maxLength={60}
                        className="w-full px-4 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.seoTitle.length}/60 characters</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        value={formData.seoDescription}
                        onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                        placeholder="Brief description for search engines (160 characters max)"
                        maxLength={160}
                        rows={3}
                        className="w-full px-4 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.seoDescription.length}/160 characters</p>
                    </div>
                  </div>
                </GlassCard>
              </>
            ) : (
              /* Preview Mode */
              <GlassCard title="Article Preview" delay={0.1}>
                <div className="prose dark:prose-invert max-w-none">
                  {selectedProject && (
                    <div className="mb-4 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Publishing to:</strong> {selectedProject.name}
                        {selectedProject.domain && (
                          <span className="ml-2 text-blue-500">({selectedProject.domain})</span>
                        )}
                      </p>
                    </div>
                  )}
                  
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {formData.title || 'Untitled Article'}
                  </h1>
                  
                  {formData.excerpt && (
                    <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-6">
                      {formData.excerpt}
                    </p>
                  )}
                  
                  <div className="border-t border-gray-200/50 dark:border-slate-700/50 pt-6">
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                      {formData.content || 'No content yet. Start writing to see the preview.'}
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Selection */}
            <GlassCard title="Project" delay={0.3}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FolderIcon className="w-4 h-4 inline mr-1" />
                  Select Project *
                </label>
                <select
                  value={formData.projectId}
                  onChange={(e) => handleInputChange('projectId', e.target.value)}
                  className="w-full px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Choose a project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name} {project.domain ? `(${project.domain})` : ''}
                    </option>
                  ))}
                </select>
                {selectedProject && !selectedProject.domain && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                    ⚠️ This project doesn't have a domain configured yet
                  </p>
                )}
              </div>
            </GlassCard>

            {/* Publishing Options */}
            <GlassCard title="Publishing" delay={0.4}>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="featured" className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                    <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
                    Featured Article
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <CalendarIcon className="w-4 h-4 inline mr-1" />
                    Schedule Publication
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.scheduledAt}
                    onChange={(e) => handleInputChange('scheduledAt', e.target.value)}
                    className="w-full px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                  />
                </div>

                {formData.content && (
                  <div className="p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center text-sm text-blue-700 dark:text-blue-300">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      Estimated read time: {estimatedReadTime} min
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Category */}
            <GlassCard title="Category" delay={0.5}>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Choose a category</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </GlassCard>

            {/* Tags */}
            <GlassCard title="Tags" delay={0.6}>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <TagIcon className="w-4 h-4 inline mr-1" />
                    Add Tags
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newTag))}
                      placeholder="Type a tag..."
                      className="flex-1 px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                    <motion.button
                      onClick={() => addTag(newTag)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Current Tags */}
                {formData.tags.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                          >
                            <XMarkIcon className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Tags */}
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {POPULAR_TAGS.filter(tag => !formData.tags.includes(tag)).map((tag) => (
                      <motion.button
                        key={tag}
                        onClick={() => addTag(tag)}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Cover Image */}
            <GlassCard title="Cover Image" delay={0.7}>
              <div className="space-y-3">
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => handleInputChange('coverImage', e.target.value)}
                  placeholder="Enter image URL or upload..."
                  className="w-full px-3 py-2 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
                
                <motion.button
                  className="w-full py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium border-2 border-dashed border-gray-300 dark:border-slate-600"
                  whileHover={{ scale: 1.02 }}
                >
                  <PhotoIcon className="w-5 h-5 mx-auto mb-1" />
                  Upload Image
                </motion.button>

                {formData.coverImage && (
                  <div className="mt-3">
                    <img
                      src={formData.coverImage}
                      alt="Cover preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}