// components/UserSession.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserIcon, 
  CogIcon, 
  BellIcon, 
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function UserSession() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (status !== 'authenticated' || !session?.user) return null;

  const menuItems = [
    { href: '/profile', icon: UserIcon, label: 'My Profile' },
    { href: '/settings', icon: CogIcon, label: 'Settings' },
    { href: '/notifications', icon: BellIcon, label: 'Notifications', badge: true },
    { href: '/help', icon: QuestionMarkCircleIcon, label: 'Help Center' },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed top-4 right-6 z-50"
    >
      {/* User Info Card */}
      <motion.div
        className="cursor-pointer"
        onClick={() => setMenuOpen(open => !open)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-gray-200/50 dark:border-slate-700/50 rounded-xl px-4 py-3 shadow-lg">
          {/* Avatar */}
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0)}
            </span>
          </div>
          
          {/* User Info */}
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Welcome, {session.user.name || 'User'}
            </p>
            {session.user.role && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                {session.user.role}
              </span>
            )}
          </div>
          
          {/* Notification dot */}
          <div className="relative">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-72 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Account Menu
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {session.user.email}
                  </p>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-200/50 dark:border-slate-700/50">
              <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-yellow-500"
                >
                  ✨
                </motion.span>
                <span>Don't forget to check your notifications!</span>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="py-2">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-slate-700/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Sign Out */}
            <div className="border-t border-gray-200/50 dark:border-slate-700/50 p-2">
              <motion.button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}