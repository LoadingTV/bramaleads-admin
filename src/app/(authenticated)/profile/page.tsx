'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/GlassCard';
import { 
  UserIcon, 
  EnvelopeIcon, 
  ShieldCheckIcon,
  CalendarIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { formatUserRole, getUserInitials } from '@/utils/auth';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <GlassCard delay={0.1}>
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {getUserInitials(user.fullName)}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {user.fullName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {formatUserRole(user.role)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 dark:text-green-400">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <UserIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.fullName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <EnvelopeIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <ShieldCheckIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
                      <p className="font-medium text-gray-900 dark:text-white">{formatUserRole(user.role)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                      <p className="font-mono text-sm text-gray-900 dark:text-white">{user.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <GlassCard title="Quick Actions" delay={0.2}>
              <div className="space-y-3">
                <motion.button
                  className="w-full p-3 text-left bg-gray-50/50 dark:bg-slate-700/30 rounded-lg hover:bg-gray-100/50 dark:hover:bg-slate-600/50 transition-colors flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <CogIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">Account Settings</span>
                </motion.button>
                
                <motion.button
                  className="w-full p-3 text-left bg-gray-50/50 dark:bg-slate-700/30 rounded-lg hover:bg-gray-100/50 dark:hover:bg-slate-600/50 transition-colors flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <ShieldCheckIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-900 dark:text-white">Security Settings</span>
                </motion.button>
              </div>
            </GlassCard>

            <GlassCard title="Account Status" delay={0.3}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Role</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatUserRole(user.role)}
                  </span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}