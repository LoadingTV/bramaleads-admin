// src/app/leads/page.tsx
'use client';

import React from 'react';
import { useLeads } from '@/hooks/useLeads';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LeadsPage() {
  const { leads, isLoading, isError } = useLeads();

  if (isLoading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  if (isError) return <div className="min-h-screen flex justify-center items-center text-red-500">Error loading leads</div>;

  return (
    <main className="min-h-screen bg-white dark:bg-black py-16 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-black dark:text-white">Leads Overview</h1>
          <Link href="/create">
            <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-700 transition duration-300">
              + New Lead
            </button>
          </Link>
        </div>

        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="min-w-full table-auto bg-white dark:bg-black text-black dark:text-white">
            <thead className="border-b border-gray-300 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Project</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition duration-200 ${lead.is_viewed ? '' : 'font-semibold'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4">
                    {lead.first_name} {lead.last_name}
                  </td>
                  <td className="px-6 py-4">
                    {lead.phone}
                  </td>
                  <td className="px-6 py-4">
                    {lead.source_project?.name ?? '—'}
                  </td>
                  <td className="px-6 py-4 capitalize">
                    {lead.status.replace('_', ' ')}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/leads/${lead.id}`}>
                      <button className="px-4 py-1 border border-black dark:border-white rounded-full hover:bg-black hover:text-white transition duration-300">
                        Edit
                      </button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Link href="/">
            <button className="text-black dark:text-white hover:text-gray-500 transition font-medium">
              ← Back to Dashboard
            </button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}