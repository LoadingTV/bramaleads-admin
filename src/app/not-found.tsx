// src/app/not-found.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  ArrowLeftIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function NotFound() {
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-[12rem] md:text-[16rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 leading-none"
            animate={floatingAnimation}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Error Icon */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center mx-auto mb-6">
            <ExclamationTriangleIcon className="w-12 h-12 text-yellow-400" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track!
          </p>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-md mx-auto">
            <div className="flex items-center space-x-3 mb-4">
              <MagnifyingGlassIcon className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Quick Search</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for pages, leads, projects..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MagnifyingGlassIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Link href="/">
            <motion.button
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </motion.button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Popular Pages */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <h3 className="text-white font-semibold mb-4">Popular Pages</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { name: 'Leads', href: '/leads' },
              { name: 'Projects', href: '/projects' },
              { name: 'Team', href: '/team' },
              { name: 'Calendar', href: '/calendar' },
              { name: 'Documents', href: '/documents' },
              { name: 'Reports', href: '/reports' },
            ].map((page, index) => (
              <Link key={page.name} href={page.href}>
                <motion.button
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {page.name}
                </motion.button>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}