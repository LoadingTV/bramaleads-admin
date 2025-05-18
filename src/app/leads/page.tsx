'use client';

import React from 'react';
import { useLeads } from '@/hooks/useLeads';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';

export default function LeadsPage() {
  const { leads, isLoading, isError } = useLeads();

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)   return <div className="p-4 text-red-500">Error loading leads</div>;

  return (
    <main className="max-w-3xl mx-auto mt-16 px-6 py-10 bg-white shadow-sm rounded-2xl border border-gray-200">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Leads</h1>
        <Link href="/settings">
          <button className="text-gray-600 hover:text-black transition font-medium">
            Settings →
          </button>
        </Link>
      </div>

      <GlassCard title="Lead List">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Project</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className={lead.is_viewed ? '' : 'font-bold'}>
                  <td className="px-4 py-2">
                    {lead.first_name} {lead.last_name}
                  </td>
                  <td className="px-4 py-2">{lead.phone}</td>
                  <td className="px-4 py-2">{lead.source_project?.name ?? '—'}</td>
                  <td className="px-4 py-2">{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </main>
  );
}
