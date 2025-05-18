'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Link from 'next/link';
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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center pt-20 pb-10 px-4">
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-8">Leads</h1>

      <Link href="/create" className="mb-8">
        <button className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
          + Create New Lead
        </button>
      </Link>

      <GlassCard className="w-full max-w-2xl">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {leads.map((lead) => (
            <li key={lead.id} className="py-4 flex justify-between">
              <span className="text-gray-900 dark:text-gray-100 font-medium">{lead.firstName}</span>
              <span className="text-gray-500 dark:text-gray-400">{lead.email}</span>
              <span className="text-gray-500 dark:text-gray-400">{lead.status}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </main>
  );
}
