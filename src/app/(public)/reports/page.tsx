// src/app/reports/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { 
  ChartBarIcon, 
  PlusIcon, 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon,
  CurrencyEuroIcon,
  FunnelIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import {AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

const monthlyData = [
  { month: 'Jan', leads: 45, conversions: 12, revenue: 24000 },
  { month: 'Feb', leads: 52, conversions: 15, revenue: 31000 },
  { month: 'Mar', leads: 48, conversions: 13, revenue: 28000 },
  { month: 'Apr', leads: 61, conversions: 18, revenue: 42000 },
  { month: 'May', leads: 55, conversions: 16, revenue: 38000 },
  { month: 'Jun', leads: 68, conversions: 22, revenue: 52000 },
];

const conversionData = [
  { stage: 'Leads', value: 300, color: '#3B82F6' },
  { stage: 'Qualified', value: 180, color: '#10B981' },
  { stage: 'Proposals', value: 95, color: '#F59E0B' },
  { stage: 'Closed Won', value: 42, color: '#8B5CF6' },
];

const sourceData = [
  { name: 'Organic Search', value: 35, color: '#3B82F6' },
  { name: 'Social Media', value: 25, color: '#10B981' },
  { name: 'Email Campaign', value: 20, color: '#F59E0B' },
  { name: 'Direct Traffic', value: 15, color: '#EF4444' },
  { name: 'Referrals', value: 5, color: '#8B5CF6' },
];

const teamPerformance = [
  { name: 'Alex Johnson', leads: 85, conversions: 23, revenue: 45000 },
  { name: 'Sarah Davis', leads: 72, conversions: 19, revenue: 38000 },
  { name: 'Mike Chen', leads: 68, conversions: 15, revenue: 32000 },
  { name: 'Emily Rodriguez', leads: 91, conversions: 27, revenue: 58000 },
];

const REPORT_TEMPLATES = [
  {
    id: 'sales-overview',
    name: 'Sales Overview',
    description: 'Comprehensive sales performance analysis',
    icon: ChartBarIcon,
    color: 'from-blue-500 to-blue-600',
    metrics: ['Revenue', 'Conversions', 'Pipeline']
  },
  {
    id: 'lead-analysis',
    name: 'Lead Analysis',
    description: 'Lead generation and conversion tracking',
    icon: UserGroupIcon,
    color: 'from-green-500 to-green-600',
    metrics: ['Lead Sources', 'Quality Score', 'Conversion Rate']
  },
  {
    id: 'team-performance',
    name: 'Team Performance',
    description: 'Individual and team productivity metrics',
    icon: UserGroupIcon,
    color: 'from-purple-500 to-purple-600',
    metrics: ['Individual KPIs', 'Team Goals', 'Activity Tracking']
  },
  {
    id: 'financial-report',
    name: 'Financial Report',
    description: 'Revenue, costs, and profitability analysis',
    icon: CurrencyEuroIcon,
    color: 'from-orange-500 to-orange-600',
    metrics: ['Revenue Growth', 'Cost Analysis', 'ROI']
  }
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const kpiData = {
    totalRevenue: '€215,000',
    revenueGrowth: '+12.5%',
    totalLeads: 389,
    leadGrowth: '+8.3%',
    conversionRate: '14.2%',
    conversionGrowth: '+2.1%',
    avgDealSize: '€5,115',
    dealSizeGrowth: '+4.7%'
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
                Reports & Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive business intelligence and performance insights
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/70 dark:bg-slate-800/70 rounded-lg p-1">
                {(['7d', '30d', '90d', '1y'] as const).map((period) => (
                  <motion.button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                      selectedPeriod === period
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {period}
                  </motion.button>
                ))}
              </div>
              <motion.button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlusIcon className="w-5 h-5" />
                <span>Create Report</span>
              </motion.button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { title: 'Total Revenue', value: kpiData.totalRevenue, growth: kpiData.revenueGrowth, icon: CurrencyEuroIcon, color: 'from-green-500 to-green-600' },
              { title: 'Total Leads', value: kpiData.totalLeads, growth: kpiData.leadGrowth, icon: UserGroupIcon, color: 'from-blue-500 to-blue-600' },
              { title: 'Conversion Rate', value: kpiData.conversionRate, growth: kpiData.conversionGrowth, icon: FunnelIcon, color: 'from-purple-500 to-purple-600' },
              { title: 'Avg Deal Size', value: kpiData.avgDealSize, growth: kpiData.dealSizeGrowth, icon: ChartBarIcon, color: 'from-orange-500 to-orange-600' },
            ].map((kpi, index) => {
              const IconComponent = kpi.icon;
              const isPositive = kpi.growth.startsWith('+');
              return (
                <motion.div
                  key={kpi.title}
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-xl p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${kpi.color} rounded-xl`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {isPositive ? (
                        <ArrowTrendingUpIcon className="w-4 h-4" />
                      ) : (
                        <ArrowTrendingDownIcon className="w-4 h-4" />
                      )}
                      <span>{kpi.growth}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{kpi.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Trend */}
          <GlassCard title="Revenue Trend" delay={0.2}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
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
                    dataKey="revenue"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Lead Sources */}
          <GlassCard title="Lead Sources" delay={0.3}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Conversion Funnel */}
          <GlassCard title="Sales Funnel" delay={0.4}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis type="number" stroke="#6B7280" />
                  <YAxis dataKey="stage" type="category" stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Team Performance */}
          <GlassCard title="Team Performance" delay={0.5}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformance}>
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
                  <Bar dataKey="conversions" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Report Templates */}
        <GlassCard title="Report Templates" delay={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REPORT_TEMPLATES.map((template, index) => {
              const IconComponent = template.icon;
              return (
                <motion.div
                  key={template.id}
                  className="p-6 bg-gray-50/50 dark:bg-slate-700/30 rounded-xl border border-gray-200/50 dark:border-slate-600/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${template.color} rounded-xl`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <motion.button
                      className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <DocumentArrowDownIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {template.description}
                  </p>
                  
                  <div className="space-y-1">
                    {template.metrics.map((metric) => (
                      <div key={metric} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {metric}
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Generate Report
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Create Report Modal */}
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Create Custom Report
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Report name"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select Report Type</option>
                  <option>Sales Performance</option>
                  <option>Lead Analysis</option>
                  <option>Team Productivity</option>
                  <option>Financial Overview</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Report description (optional)"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Create Report
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}