// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import GlassCard from '@/components/GlassCard';

interface Lead {
  id: string;
  firstName: string;
  email: string;
  status: string;
}

export default function HomePage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await api.get<Lead[]>('/leads');
        setLeads(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLeads();
  }, []);

  const leadStatusData = [
    { name: 'New', value: leads.filter(l => l.status === 'new').length },
    { name: 'In Progress', value: leads.filter(l => l.status === 'in_progress').length },
    { name: 'Done', value: leads.filter(l => l.status === 'done').length },
    { name: 'Spam', value: leads.filter(l => l.status === 'spam').length },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <main className="min-h-screen bg-white dark:bg-black flex flex-col items-center py-16 px-4">
      <motion.h1
        className="text-4xl font-bold text-black dark:text-black mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='text-white text-5xl'>CRM Dashboard</h2>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <Link href="/create">
        <button
  className="
    px-6 py-2
    bg-white text-black
    rounded-full
    border-2 border-transparent
    hover:bg-black hover:text-white hover:border-white
    transition duration-300
  "
>
  + Add New Lead
</button>

        </Link>
      </motion.div>

      <GlassCard className="w-full max-w-4xl mb-10 p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-black dark:text-black mb-6">Lead Status Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={leadStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {leadStatusData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </GlassCard>

      <GlassCard className="w-full max-w-4xl p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-black dark:text-black mb-6">Recent Leads</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {leads.slice(0, 5).map((lead) => (
            <li key={lead.id} className="py-4 flex justify-between items-center">
              <span className="text-black dark:text-black font-medium">{lead.firstName}</span>
              <span className="text-black dark:text-black">{lead.email}</span>
              <span className="text-black dark:text-black capitalize font-semibold">{lead.status.replace('_', ' ')}</span>
            </li>
          ))}
        </ul>
        <Link href="/leads" className="mt-6 inline-block text-black dark:text-black underline hover:no-underline">
          View All Leads
        </Link>
      </GlassCard>
    </main>
  );
}
