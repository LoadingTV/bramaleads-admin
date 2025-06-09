// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import GlassCard from '@/components/GlassCard';
import { 
  PlusIcon, 
  UserGroupIcon, 
  FolderIcon, 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Lead {
  id: string;
  firstName: string;
  email: string;
  status: string;
  createdAt?: string;
}

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function HomePage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await api.get<Lead[]>('/leads');
        setLeads(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLeads();
  }, []);

  const leadStatusData = [
    { name: 'New', value: leads.filter(l => l.status === 'new').length, color: '#3B82F6' },
    { name: 'In Progress', value: leads.filter(l => l.status === 'in_progress').length, color: '#10B981' },
    { name: 'Done', value: leads.filter(l => l.status === 'done').length, color: '#F59E0B' },
    { name: 'Spam', value: leads.filter(l => l.status === 'spam').length, color: '#EF4444' },
  ];

  const monthlyData = [
    { month: 'Jan', leads: 12, projects: 4 },
    { month: 'Feb', leads: 19, projects: 6 },
    { month: 'Mar', leads: 25, projects: 8 },
    { month: 'Apr', leads: 22, projects: 7 },
    { month: 'May', leads: 28, projects: 9 },
    { month: 'Jun', leads: 32, projects: 11 },
  ];

  const stats: StatCard[] = [
    {
      title: 'Total Leads',
      value: leads.length,
      change: '+12%',
      trend: 'up',
      icon: UserGroupIcon,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Projects',
      value: '24',
      change: '+8%',
      trend: 'up',
      icon: FolderIcon,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Monthly Revenue',
      value: '$45,200',
      change: '+15%',
      trend: 'up',
      icon: ChartBarIcon,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '68%',
      change: '+5%',
      trend: 'up',
      icon: ArrowTrendingUpIcon,
      color: 'from-orange-500 to-orange-600'
    },
  ];
   return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Dashboard
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Welcome back! Here&apos;s what&apos;s happening with your business today.
          </motion.p>
        </div>

        {/* Quick Action */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/create">
            <motion.button
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add New Lead</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            const getStatLink = (title: string) => {
              switch(title) {
                case 'Total Leads': return '/leads';
                case 'Active Projects': return '/projects/overview';
                case 'Monthly Revenue': return '/analytics/revenue';
                case 'Conversion Rate': return '/analytics/conversion';
                default: return '#';
              }
            };
            
            return (
              <Link key={stat.title} href={getStatLink(stat.title)}>
                <GlassCard animate delay={index * 0.1} className="relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                        <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Lead Status Chart */}
          <GlassCard title="Lead Status Distribution" delay={0.4}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {leadStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Monthly Trends */}
          <GlassCard title="Monthly Trends" delay={0.5}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorLeads)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="projects"
                    stroke="#10B981"
                    fillOpacity={1}
                    fill="url(#colorProjects)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Leads */}
          <div className="lg:col-span-2">
            <GlassCard title="Recent Leads" delay={0.6}>
              <div className="space-y-4">
                {leads.slice(0, 5).map((lead, index) => (
                  <motion.div
                    key={lead.id}
                    className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-slate-700/30 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {lead.firstName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {lead.firstName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {lead.email}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                      lead.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      lead.status === 'done' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {lead.status.replace('_', ' ')}
                    </span>
                  </motion.div>
                ))}
                <Link href="/leads" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium mt-4">
                  View All Leads →
                </Link>
              </div>
            </GlassCard>
          </div>

          {/* Quick Stats */}
          <GlassCard title="Quick Stats" delay={0.7}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Avg. Response Time</span>
                </div>
                <span className="text-sm font-semibold text-green-600">2.3h</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium">Success Rate</span>
                </div>
                <span className="text-sm font-semibold text-green-600">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <UserGroupIcon className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium">Active Clients</span>
                </div>
                <span className="text-sm font-semibold text-purple-600">127</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FolderIcon className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">Projects Completed</span>
                </div>
                <span className="text-sm font-semibold text-orange-600">58</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
     );
}