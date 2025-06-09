// src/components/public/Features.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { 
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  CogIcon,
  DocumentTextIcon,
  BellIcon,
  GlobeAltIcon,
  FolderIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  benefits: string[];
}

const features: Feature[] = [
  {
    icon: UserGroupIcon,
    title: 'Lead Management',
    description: 'Efficiently track and manage your leads from first contact to conversion',
    color: 'from-blue-500 to-blue-600',
    benefits: ['Lead scoring', 'Automated follow-ups', 'Conversion tracking']
  },
  {
    icon: ChartBarIcon,
    title: 'Advanced Analytics',
    description: 'Get deep insights into your business performance with comprehensive reports',
    color: 'from-green-500 to-green-600',
    benefits: ['Real-time dashboards', 'Custom reports', 'Performance metrics']
  },
  {
    icon: FolderIcon,
    title: 'Project Management',
    description: 'Organize and track your projects with powerful management tools',
    color: 'from-purple-500 to-purple-600',
    benefits: ['Task tracking', 'Team collaboration', 'Deadline management']
  },
  {
    icon: CalendarIcon,
    title: 'Calendar Integration',
    description: 'Seamlessly manage appointments and meetings in one place',
    color: 'from-orange-500 to-orange-600',
    benefits: ['Meeting scheduling', 'Reminder notifications', 'Calendar sync']
  },
  {
    icon: DocumentTextIcon,
    title: 'Document Management',
    description: 'Store, organize, and share documents securely with your team',
    color: 'from-indigo-500 to-indigo-600',
    benefits: ['File organization', 'Version control', 'Secure sharing']
  },
  {
    icon: BellIcon,
    title: 'Smart Notifications',
    description: 'Stay informed with intelligent alerts and automated reminders',
    color: 'from-yellow-500 to-yellow-600',
    benefits: ['Real-time alerts', 'Custom triggers', 'Email notifications']
  },
  {
    icon: ShieldCheckIcon,
    title: 'Enterprise Security',
    description: 'Bank-level security to keep your business data safe and compliant',
    color: 'from-red-500 to-red-600',
    benefits: ['Data encryption', 'Access controls', 'Compliance ready']
  },
  {
    icon: CogIcon,
    title: 'Automation Tools',
    description: 'Automate repetitive tasks and streamline your business processes',
    color: 'from-pink-500 to-pink-600',
    benefits: ['Workflow automation', 'Task scheduling', 'Process optimization']
  },
  {
    icon: GlobeAltIcon,
    title: 'Multi-language Support',
    description: 'Work globally with support for multiple languages and currencies',
    color: 'from-teal-500 to-teal-600',
    benefits: ['30+ languages', 'Currency conversion', 'Regional settings']
  }
];

const stats = [
  { value: '50K+', label: 'Active Users', icon: UserGroupIcon },
  { value: '99.9%', label: 'Uptime', icon: ClockIcon },
  { value: '2M+', label: 'Leads Managed', icon: ChartBarIcon },
  { value: '150+', label: 'Countries', icon: GlobeAltIcon }
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ShieldCheckIcon className="w-4 h-4" />
            <span>Powerful Features</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              grow your business
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Brama CRM provides all the tools you need to manage customers, track leads, 
            and scale your business efficiently. From small startups to enterprise companies.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
              >
                <GlassCard 
                  animate={false} 
                  className="h-full hover:scale-105 transition-transform duration-300 group cursor-pointer"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <motion.div
                      className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.div
                        key={benefit}
                        className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1 + benefitIndex * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-6 pt-4 border-t border-gray-200/50 dark:border-slate-700/50"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors group-hover:translate-x-1 transition-transform duration-300 flex items-center">
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to transform your business?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of companies already using Brama CRM to streamline their operations and boost growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
              <motion.button
                className="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}