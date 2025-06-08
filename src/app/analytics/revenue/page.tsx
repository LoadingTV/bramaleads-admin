// src/app/analytics/revenue/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { 
  CurrencyEuroIcon, 
  ArrowLeftIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
import {Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const monthlyRevenueData = [
  { month: 'Jan', revenue: 24000, target: 25000, recurring: 18000, oneTime: 6000 },
  { month: 'Feb', revenue: 31000, target: 26000, recurring: 22000, oneTime: 9000 },
  { month: 'Mar', revenue: 28000, target: 27000, recurring: 20000, oneTime: 8000 },
  { month: 'Apr', revenue: 42000, target: 28000, recurring: 30000, oneTime: 12000 },
  { month: 'May', revenue: 38000, target: 29000, recurring: 28000, oneTime: 10000 },
  { month: 'Jun', revenue: 52000, target: 30000, recurring: 35000, oneTime: 17000 },
  { month: 'Jul', revenue: 48000, target: 31000, recurring: 33000, oneTime: 15000 },
  { month: 'Aug', revenue: 56000, target: 32000, recurring: 38000, oneTime: 18000 },
];

const revenueSourceData = [
  { name: 'Subscription', value: 65, color: '#3B82F6', amount: 338000 },
  { name: 'One-time Sales', value: 25, color: '#10B981', amount: 130000 },
  { name: 'Consulting', value: 7, color: '#F59E0B', amount: 36400 },
  { name: 'Other', value: 3, color: '#EF4444', amount: 15600 },
];

const topClientsData = [
  { name: 'Acme Corporation', revenue: 45000, growth: '+12%', trend: 'up' },
  { name: 'Tech Solutions Ltd', revenue: 38000, growth: '+8%', trend: 'up' },
  { name: 'Global Industries', revenue: 32000, growth: '-3%', trend: 'down' },
  { name: 'Innovation Hub', revenue: 28000, growth: '+15%', trend: 'up' },
  { name: 'Future Systems', revenue: 24000, growth: '+5%', trend: 'up' },
];

const quarterlyData = [
  { quarter: 'Q1 2024', revenue: 83000, growth: 12.5 },
  { quarter: 'Q2 2024', revenue: 132000, growth: 18.2 },
  { quarter: 'Q3 2024', revenue: 156000, growth: 15.8 },
  { quarter: 'Q4 2024', revenue: 180000, growth: 22.3 },
];

export default function RevenueAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  const totalRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const averageMonthly = Math.round(totalRevenue / monthlyRevenueData.length);
  const growthRate = 15.2;
  const targetAchievement = 112;

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
                Revenue Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive revenue tracking and financial insights
              </p>
            </div>

            <div className="flex items-center bg-white/70 dark:bg-slate-800/70 rounded-lg p-1">
              {(['month', 'quarter', 'year'] as const).map((period) => (
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
                title: 'Total Revenue', 
                value: `€${totalRevenue.toLocaleString()}`, 
                change: `+${growthRate}%`, 
                icon: CurrencyEuroIcon, 
                color: 'from-green-500 to-green-600',
                trend: 'up'
              },
              { 
                title: 'Monthly Average', 
                value: `€${averageMonthly.toLocaleString()}`, 
                change: '+8.3%', 
                icon: ChartBarIcon, 
                color: 'from-blue-500 to-blue-600',
                trend: 'up'
              },
              { 
                title: 'Target Achievement', 
                value: `${targetAchievement}%`, 
                change: '+12%', 
                icon: ArrowTrendingUpIcon, 
                color: 'from-purple-500 to-purple-600',
                trend: 'up'
              },
              { 
                title: 'Recurring Revenue', 
                value: '€338K', 
                change: '+18%', 
                icon: BanknotesIcon, 
                color: 'from-orange-500 to-orange-600',
                trend: 'up'
              },
            ].map((metric, index) => {
              const IconComponent = metric.icon;
              const TrendIcon = metric.trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
              return (
                <motion.div
                  key={metric.title}
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-xl p-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
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
          {/* Monthly Revenue Trend */}
          <GlassCard title="Monthly Revenue Trend" delay={0.2}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="revenue"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={3}
                    name="Actual Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#10B981"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Revenue Sources */}
          <GlassCard title="Revenue Sources" delay={0.3}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueSourceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {revenueSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      `€${props.payload.amount.toLocaleString()}`, 
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Quarterly Performance */}
          <GlassCard title="Quarterly Performance" delay={0.4}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quarterlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="quarter" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Revenue Breakdown */}
          <GlassCard title="Recurring vs One-time Revenue" delay={0.5}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData}>
                  <defs>
                    <linearGradient id="colorRecurring" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorOneTime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
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
                    dataKey="recurring"
                    stackId="1"
                    stroke="#10B981"
                    fill="url(#colorRecurring)"
                    name="Recurring Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="oneTime"
                    stackId="1"
                    stroke="#F59E0B"
                    fill="url(#colorOneTime)"
                    name="One-time Revenue"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Top Clients Table */}
        <GlassCard title="Top Revenue Clients" delay={0.6}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200/50 dark:border-slate-700/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Growth</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-slate-700/50">
                {topClientsData.map((client, index) => {
                  const TrendIcon = client.trend === 'up' ? ArrowTrendingUpIcon : ArrowTrendingDownIcon;
                  return (
                    <motion.tr
                      key={client.name}
                      className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-semibold text-sm">
                              {client.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">{client.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white font-semibold">
                        €{client.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${
                          client.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {client.growth}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <TrendIcon className={`w-5 h-5 ${
                          client.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`} />
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}