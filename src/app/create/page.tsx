'use client';

import { useState } from 'react';
import { api } from '../../lib/api';
import Link from 'next/link';

export default function CreateLeadPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gclid: '',
    utmSource: '',
    utmCampaign: '',
    sourceProjectId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/leads', form);
      alert('Lead submitted!');
    } catch (err: any) {
      console.error('Submission error:', err.response?.data || err.message);
      alert('Error submitting lead.');
    }
  };

  return (
    <main style={{ padding: 20 }}>
        <div style={{ marginBottom: 20 }}>
       <Link href="/">
      <button
        style={{
          padding: '8px 12px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: 4,
        }}
      >
        Home
      </button>
    </Link>
      </div>
      <h1>Create Lead</h1>

      <input name="firstName" placeholder="First Name" onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />

      <hr />

      <input name="gclid" placeholder="GCLID (optional)" onChange={handleChange} />
      <input name="utmSource" placeholder="UTM Source (optional)" onChange={handleChange} />
      <input name="utmCampaign" placeholder="UTM Campaign (optional)" onChange={handleChange} />
      <input name="sourceProjectId" placeholder="Source Project ID (optional)" onChange={handleChange} />

      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        Submit
      </button>
    </main>
  );
}
