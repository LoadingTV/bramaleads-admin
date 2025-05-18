// components/UserSession.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', top: '80px', right: '10px', zIndex: 2 }}
      className="flex justify-end px-5 py-2 cursor-pointer"
      onClick={() => setMenuOpen(open => !open)}
    >
      <div
        className="
          flex items-center space-x-2
          bg-white bg-opacity-40 dark:bg-gray-800 dark:bg-opacity-50
          backdrop-blur-lg
          ring-1 ring-inset ring-gray-200 ring-opacity-20 dark:ring-gray-700 dark:ring-opacity-50
          border-black border fixed px-4 py-2 shadow-lg transition duration-300
        "
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          Welcome, {session.user.name}
          <span className="inline-block ml-1 animate-spin">✨</span>
        </span>
        <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900 dark:bg-opacity-30 text-green-800 dark:text-green-300 rounded animate-pulse">
          {session.user.role}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            layout
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              collapsed: { height: 0, opacity: 0 },
              open: { height: 'auto', opacity: 1 }
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              overflow: 'hidden',
              transformOrigin: 'top center',
              border: '1px solid transparent',
              borderImage: 'linear-gradient(135deg, #ff6ec4, #7873f5, #4ade80, #facc15) 1'
            }}
            className="
              origin-top absolute right-0 mt-2 w-64
              backdrop-blur-lg bg-white bg-opacity-20 dark:bg-gray-800 dark:bg-opacity-30
              rounded-lg shadow-lg
            "
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              ✖️
            </button>

            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="whitespace-nowrap marquee text-xs text-gray-700 dark:text-gray-300">
                Welcome back! Don’t forget to check your notifications 🔔
              </div>
            </div>

            <nav className="px-4 py-2 space-y-1">
              <a href="/profile" className="flex items-center space-x-2 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
                <span>👤</span><span>My Profile</span>
              </a>
              <a href="/settings" className="flex items-center space-x-2 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
                <span>⚙️</span><span>Settings</span>
              </a>
              <a href="/notifications" className="relative flex items-center space-x-2 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
                <span>🔔</span><span>Notifications</span>
                <span className="absolute right-3 top-2 inline-flex h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
              </a>
              <a href="/help" className="flex items-center space-x-2 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition">
                <span>❓</span><span>Help Center</span>
              </a>
            </nav>

            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-600 px-3 py-2 rounded transition"
              >
                Sign Out
              </button>
            </div>

            <style jsx>{`
              @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
              .marquee {
                display: inline-block;
                animation: marquee 10s linear infinite;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
