'use client';

import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import Link from 'next/link';

export default function HomePage() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.get('/leads').then(res => setLeads(res.data));
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Leads</h1>

      <div style={{ marginBottom: 20 }}>
        <Link href="/create">
          <button style={{ padding: '8px 12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: 4 }}>
            + Create New Lead
          </button>
        </Link>
      </div>

      <ul>
        {leads.map((lead: any) => (
          <li key={lead.id}>
            {lead.firstName} — {lead.email} — {lead.status}
          </li>
        ))}
      </ul>
    </main>
  );
}
