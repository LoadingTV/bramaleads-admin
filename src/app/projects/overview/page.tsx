// src/app/projects/overview/page.tsx - Детальный обзор всех проектов
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { 
  FolderIcon,
  ArrowLeftIcon,
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  PauseIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface ProjectDetail {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  teamMembers: string[];
  manager: string;
  client: string;
  tags: string[];
  tasksTotal: number;
  tasksCompleted: number;
  lastUpdate: string;
}

const projectsData: ProjectDetail[] = [
  {
    id: '1',
    name: 'CRM System Redesign',
    description: 'Complete overhaul of the customer relationship management system with modern UI/UX',
    status: 'active',
    priority: 'high',
    progress: 65,
    startDate: '2024-03-01',
    endDate: '2024-08-15',
    budget: 85000,
    spent: 55250,
    teamMembers: ['Sarah Davis', 'Mike Chen', 'Lisa Zhang', 'David Kim'],
    manager: 'Alex Johnson',
    client: 'Internal',
    tags: ['UI/UX', 'Development', 'Database'],
    tasksTotal: 45,
    tasksCompleted: 29,
    lastUpdate: '2024-06-07'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android platforms',
    status: 'active',
    priority: 'critical',
    progress: 40,
    startDate: '2024-04-15',
    endDate: '2024-09-30',
    budget: 120000,
    spent: 48000,
    teamMembers: ['Robert Wilson', 'Jennifer Brown', 'David Kim'],
    manager: 'Sarah Davis',
    client: 'Tech Solutions Ltd',
    tags: ['Mobile', 'React Native', 'API'],
    tasksTotal: 38,
    tasksCompleted: 15,
    lastUpdate: '2024-06-06'
  },
  {
    id: '3',
    name: 'Data Analytics Dashboard',
    description: 'Advanced analytics dashboard for business intelligence',
    status: 'planning',
    priority: 'medium',
    progress: 15,
    startDate: '2024-06-01',
    endDate: '2024-10-15',
    budget: 65000,
    spent: 9750,
    teamMembers: ['Emily Rodriguez', 'Mike Chen'],
    manager: 'David Kim',
    client: 'Global Industries',
    tags: ['Analytics', 'Dashboard', 'Data Viz'],
    tasksTotal: 32,
    tasksCompleted: 5,
    lastUpdate: '2024-06-05'
  },
  {
    id: '4',
    name: 'E-commerce Platform',
    description: 'Modern e-commerce solution with payment integration',
    status: 'completed',
    priority: 'high',
    progress: 100,
    startDate: '2024-01-15',
    endDate: '2024-05-30',
    budget: 95000,
    spent: 92000,
    teamMembers: ['Alex Johnson', 'Jennifer Brown', 'Lisa Zhang'],
    manager: 'Emily Rodriguez',
    client: 'Innovation Hub',
    tags: ['E-commerce', 'Payment', 'Frontend'],
    tasksTotal: 52,
    tasksCompleted: 52,
    lastUpdate: '2024-05-30'
  },
  {
    id: '5',
    name: 'Security Audit & Implementation',
    description: 'Comprehensive security review and enhancement',
    status: 'on-hold',
    priority: 'critical',
    progress: 25,
    startDate: '2024-05-01',
    endDate: '2024-07-31',
    budget: 45000,
    spent: 11250,
    teamMembers: ['Robert Wilson', 'Sarah Davis'],
    manager: 'Alex Johnson',
    client: 'Future Systems',
    tags: ['Security', 'Audit', 'Compliance'],
    tasksTotal: 28,
    tasksCompleted: 7,
    lastUpdate: '2024-05-20'
  },
  {
    id: '6',
    name: 'Marketing Automation Tool',
    description: 'Automated marketing campaigns and lead nurturing system',
    status: 'active',
    priority: 'medium',
    progress: 80,
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    budget: 75000,
    spent: 60000,
    teamMembers: ['Mike Chen', 'Emily Rodriguez', 'Jennifer Brown'],
    manager: 'Lisa Zhang',
    client: 'Acme Corporation',
    tags: ['Marketing', 'Automation', 'Integration'],
    tasksTotal: 35,
    tasksCompleted: 28,
    lastUpdate: '2024-06-07'
  }
];

const STATUS_CONFIG = {
  planning: { label: 'Planning', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', icon: ClockIcon },
  active: { label: 'Active', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', icon: PlayIcon },
  'on-hold': { label: 'On Hold', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', icon: PauseIcon },
  completed: { label: 'Completed', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', icon: CheckCircleIcon },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', icon: ExclamationTriangleIcon },
};

const PRIORITY_CONFIG = {
  low: { label: 'Low', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' },
  medium: { label: 'Medium', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  critical: { label: 'Critical', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' },
};

export default function ProjectsOverviewPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const statusOptions = ['all', ...Object.keys(STATUS_CONFIG)];
  const filteredProjects = selectedStatus === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.status === selectedStatus);

  // Statistics
  const stats = {
    total: projectsData.length,
    active: projectsData.filter(p => p.status === 'active').length,
    completed: projectsData.filter(p => p.status === 'completed').length,
    onHold: projectsData.filter(p => p.status === 'on-hold').length,
    totalBudget: projectsData.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projectsData.reduce((sum, p) => sum + p.spent, 0),
    avgProgress: Math.round(projectsData.reduce((sum, p) => sum + p.progress, 0) / projectsData.length)
  };

  // Chart data
  const statusChartData = Object.keys(STATUS_CONFIG).map(status => ({
    name: STATUS_CONFIG[status as keyof typeof STATUS_CONFIG].label,
    value: projectsData.filter(p => p.status === status).length,
    color: status === 'active' ? '#10B981' : status === 'completed' ? '#8B5CF6' : status === 'planning' ? '#3B82F6' : status === 'on-hold' ? '#F59E0B' : '#EF4444'
  }));

  const budgetChartData = projectsData.map(project => ({
    name: project.name.substring(0, 15) + '...',
    budget: project.budget,
    spent: project.spent,
    remaining: project.budget - project.spent
  }));

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

          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Projects Overview
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive view of all active and completed projects
              </p>

              <div className="flex items-center space-x-4">
                {/* Status Filter */}
                <div className="flex items-center bg-white/70 dark:bg-slate-800/70 rounded-lg p-1">
                  {statusOptions.map((status) => (
                    <motion.button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition-all ${
                        selectedStatus === status
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {status === 'all' ? 'All' : STATUS_CONFIG[status as keyof typeof STATUS_CONFIG]?.label || status}
                    </motion.button>
                  ))}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-white/70 dark:bg-slate-800/70 rounded-lg p-1">
                  {['grid', 'table'].map((mode) => (
                    <motion.button
                      key={mode}
                      onClick={() => setViewMode(mode as 'grid' | 'table')}
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
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { title: 'Total Projects', value: stats.total, icon: FolderIcon, color: 'from-blue-500 to-blue-600' },
              { title: 'Active Projects', value: stats.active, icon: PlayIcon, color: 'from-green-500 to-green-600' },
              { title: 'Completed', value: stats.completed, icon: CheckCircleIcon, color: 'from-purple-500 to-purple-600' },
              { title: 'Avg Progress', value: `${stats.avgProgress}%`, icon: ChartBarIcon, color: 'from-orange-500 to-orange-600' },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-xl p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Project Status Distribution */}
          <GlassCard title="Project Status Distribution" delay={0.2}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Budget Overview */}
          <GlassCard title="Budget vs Spending" delay={0.3}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetChartData.slice(0, 4)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="budget" fill="#3B82F6" name="Budget" />
                  <Bar dataKey="spent" fill="#10B981" name="Spent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Projects List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const StatusIcon = STATUS_CONFIG[project.status].icon;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <GlassCard animate={false} className="h-full hover:scale-105 transition-transform duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className={`p-2 rounded-lg ${STATUS_CONFIG[project.status].color}`}>
                        <StatusIcon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Manager:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{project.manager}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Client:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{project.client}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Budget:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          €{project.budget.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Tasks:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {project.tasksCompleted}/{project.tasksTotal}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Priority & Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-slate-700/50">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${PRIORITY_CONFIG[project.priority].color}`}>
                        {PRIORITY_CONFIG[project.priority].label}
                      </span>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                          whileHover={{ scale: 1.1 }}
                        >
                          <EyeIcon className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-1.5 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                          whileHover={{ scale: 1.1 }}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <GlassCard delay={0.4}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200/50 dark:border-slate-700/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Priority</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Progress</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Manager</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Budget</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/50 dark:divide-slate-700/50">
                  {filteredProjects.map((project, index) => (
                    <motion.tr
                      key={project.id}
                      className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{project.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{project.client}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_CONFIG[project.status].color}`}>
                          {STATUS_CONFIG[project.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${PRIORITY_CONFIG[project.priority].color}`}>
                          {PRIORITY_CONFIG[project.priority].label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">{project.progress}%</span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {project.manager}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        €{project.budget.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            className="p-1.5 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                            whileHover={{ scale: 1.1 }}
                          >
                            <EyeIcon className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            className="p-1.5 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            whileHover={{ scale: 1.1 }}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}
      </div>
    </main>
  );
}