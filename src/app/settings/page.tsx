'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../lib/api';
import GlassCard from '@/components/GlassCard';
import { 
  UserIcon, 
  EnvelopeIcon, 
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Theme and notification settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
    autoSave: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings({ ...settings, [setting]: value });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (form.email && !validateEmail(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    try {
      await api.put('/settings', { ...form, ...settings });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err: any) {
      console.error('Save error:', err.response?.data || err.message);
      alert('Error saving settings.');
    } finally {
      setIsLoading(false);
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account preferences and system settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard title="Profile Information" delay={0.1}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <UserIcon className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </GlassCard>

            {/* Notification Settings */}
            <GlassCard title="Notification Preferences" delay={0.2}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates via email</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
                      animate={{
                        x: settings.emailNotifications ? 28 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Browser push notifications</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
                      animate={{
                        x: settings.pushNotifications ? 28 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CogIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Auto Save</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Automatically save changes</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.autoSave ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform"
                      animate={{
                        x: settings.autoSave ? 28 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>
              </div>
            </GlassCard>

            {/* Save Button */}
            <motion.button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
              ) : isSaved ? (
                <>
                  <CheckIcon className="w-5 h-5" />
                  <span>Settings Saved!</span>
                </>
              ) : (
                <>
                  <CogIcon className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </motion.button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Security */}
            <GlassCard title="Account Security" delay={0.3}>
              <div className="space-y-4">
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Security Status</p>
                    <p className="text-xs text-green-600 dark:text-green-400">Account Secured</p>
                  </div>
                </div>
                <motion.button
                  className="w-full py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  Change Password
                </motion.button>
                <motion.button
                  className="w-full py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  Two-Factor Auth
                </motion.button>
              </div>
            </GlassCard>

            {/* Appearance */}
            <GlassCard title="Appearance" delay={0.4}>
              <div className="space-y-4">
                <div className="flex items-center">
                  <PaintBrushIcon className="w-8 h-8 text-purple-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Theme</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Customize your experience</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    className="p-3 bg-white border-2 border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-blue-500 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    Light
                  </motion.button>
                  <motion.button
                    className="p-3 bg-slate-800 border-2 border-slate-600 rounded-lg text-xs font-medium text-white hover:border-blue-500 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    Dark
                  </motion.button>
                </div>
              </div>
            </GlassCard>

            {/* Support */}
            <GlassCard title="Support" delay={0.5}>
              <div className="space-y-3">
                <motion.button
                  className="w-full py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  📚 Documentation
                </motion.button>
                <motion.button
                  className="w-full py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  💬 Contact Support
                </motion.button>
                <motion.button
                  className="w-full py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ x: 4 }}
                >
                  🐛 Report Bug
                </motion.button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}