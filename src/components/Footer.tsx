"use client"
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          {/* Logo and Company */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Brama CRM</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">Modern Business Management</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Brama CRM. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Built with ❤️ for modern businesses
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;