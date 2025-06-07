// src/app/analytics/conversion/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { 
  FunnelIcon, 
  ArrowLeftIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList } from 'recharts';

const conversionFunnelData = [
  { stage: 'Website Visitors', value: 10000, percentage: 100, color: '#3B82F6' },
  { stage: 'Leads Generated', value: 1200, percentage: 12, color: '#10B981' },
  { stage: 'Qualified Leads', value: 720, percentage: 7.2, color: '#F59E0B' },
  { stage: 'Proposals Sent', value: 360, percentage: 3.6, color: '#8B5CF6' },
  { stage: 'Closed Won', value: 144, percentage: 1.44, color: '#EF4444' },
];

const monthlyConversionData = [
  { month: 'Jan', overall: 12.2, leadToQualified: 58, qualifiedToProposal: 48, proposalToClosed: 38 },
  { month: 'Feb', overall: 13.8, leadToQualified: 62, qualifiedToProposal: 52, proposalToClosed: 42 },
  { month: 'Mar', overall: 11.5, leadToQualified: 55, qualifiedToProposal: 45, proposalToClosed: 35 },
  { month: 'Apr', overall: 15.2, leadToQualified: 68, qualifiedToProposal: 58, proposalToClosed: 48 },
  { month: 'May', overall: 14.1, leadToQualified: 65, qualifiedToProposal: 55, proposalToClosed: 45 },
  { month: 'Jun', overall: 16.8, leadToQualified: 72, qualifiedToProposal: 62, proposalToClosed: 52 },
];

const sourceConversionData = [
  { source: 'Organic Search', conversion: 18.5, leads: 450, closed: 83 },
  { source: 'Social Media', conversion: 12.3, leads: 320, closed: 39 },
  { source: 'Email Campaign', conversion: 22.1, leads: 280, closed: 62 },
  { source: 'Direct Traffic', conversion: 15.8, leads: 190, closed: 30 },
  { source: 'Referrals', conversion: 28.4, leads: 95, closed: 27 },
];

const teamConversionData = [
  { name: 'Alex Johnson', conversion: 18.5, leads: 45, closed: 8, avgDays: 12 },
  { name: 'Sarah Davis', conversion: 22.1, leads: 38, closed: 8, avgDays: 10 },
  { name: 'Mike Chen', conversion: 15.2, leads: 42, closed: 6, avgDays: 15 },
  { name: 'Emily Rodriguez', conversion: 24.8, leads: 52, closed: 13, avgDays: 8 },
];

const timeToConversionData = [
  { days: '0-7', count: 35, percentage: 24.3 },
  { days: '8-14', count: 42, percentage: 29.2 },
  { days: '15-30', count: 38, percentage: 26.4 },
  { days: '31-60', count: 20, percentage: 13.9 },
  { days: '60+', count: 9, percentage: 6.2 },
];

export default function ConversionAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  const overallConversion = 14.4;
  const conversionGrowth = 5.2;
  const avgConversionTime = 14;
  const topPerformerConversion = 24.8;

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
                Conversion Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track and optimize your sales funnel performance
              </p>
            </div>

            <div className="flex items-center bg-white/70 dark:bg-slate-800/70 rounded-lg p-1">
              {(['week', 'month', 'quarter'] as const).map((period) => (
                <motion.button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
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
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { 
                title: 'Overall Conversion', 
                value: `${overallConversion}%`, 
                change: `+${conversionGrowth}%`, 
                icon: FunnelIcon, 
                color: 'from-blue-500 to-blue-600',
                trend: 'up'
              },
              { 
                title: 'Avg. Conversion Time', 
                value: `${avgConversionTime} days`, 
                change: '-2 days', 
                icon: ClockIcon, 
                color: 'from-green-500 to-green-600',
                trend: 'up'
              },
              { 
                title: 'Top Performer', 
                value: `${topPerformerConversion}%`, 
                change: '+3.2%', 
                icon: ArrowTrendingUpIcon, 
                color: 'from-purple-500 to-purple-600',
                trend: 'up'
              },
              { 
                title: 'Active Leads', 
                value: '324', 
                change: '+18', 
                icon: UserGroupIcon, 
                color: 'from-orange-500 to-orange-600',
                trend: 'up'
              },
            ].map((metric, index) => {
              const IconComponent = metric.icon;
              const TrendIcon = metric.trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
              return (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-white/70 dark:bg-slate-800/70 rounded-xl p-6 shadow flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${metric.color} rounded-xl`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center space-x-1 text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      <TrendIcon className="w-4 h-4" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{metric.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Conversion Funnel */}
          <GlassCard title="Sales Funnel" delay={0.2}>
            <div className="space-y-4">
              {conversionFunnelData.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {stage.stage}
                    </span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {stage.value.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        ({stage.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ 
                        backgroundColor: stage.color,
                        width: `${stage.percentage}%`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.percentage}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    >
                      {stage.percentage > 10 && `${stage.percentage}%`}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Monthly Conversion Trend */}
          <GlassCard title="Monthly Conversion Trend" delay={0.3}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyConversionData}>
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
                  <Line
                    type="monotone"
                    dataKey="overall"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    name="Overall Conversion %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Source Performance */}
          <GlassCard title="Conversion by Source" delay={0.4}>
            <div className="space-y-4">
              {sourceConversionData.map((source, index) => (
                <motion.div
                  key={source.source}
                  className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-slate-700/30 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {source.source}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{source.leads} leads</span>
                      <span>{source.closed} closed</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {source.conversion}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Time to Conversion */}
          <GlassCard title="Time to Conversion" delay={0.5}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeToConversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="days" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#8B5CF6" 
                    radius={[4, 4, 0, 0]}
                    name="Conversions"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Team Performance */}
        <GlassCard title="Team Conversion Performance" delay={0.6}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200/50 dark:border-slate-700/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Team Member</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Conversion Rate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Leads</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Closed</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Avg. Days</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-slate-700/50">
                {teamConversionData.map((member, index) => (
                  <motion.tr
                    key={member.name}
                    className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-semibold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{member.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400 mr-2">
                          {member.conversion}%
                        </span>
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${member.conversion}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      {member.leads}
                    </td>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                      {member.closed}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        {member.avgDays} days
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}