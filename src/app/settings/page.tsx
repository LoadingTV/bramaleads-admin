'use client';

import React, { useState } from 'react';
import { api } from '../../lib/api';
import Link from 'next/link';

export default function SettingsPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    if (!validateEmail(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      await api.put('/settings', form);
      alert('Settings saved!');
    } catch (err: any) {
      console.error('Save error:', err.response?.data || err.message);
      alert('Error saving settings.');
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-16 px-6 py-10 bg-white shadow-sm rounded-2xl border border-gray-200">
      <div className="mb-8">
        <Link href="/">
          <button className="text-gray-600 hover:text-black transition font-medium">
            ← Back to Home
          </button>
        </Link>
      </div>

      <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">Settings</h1>

      <div className="space-y-5">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 w-full bg-black text-white py-3 rounded-xl border border-transparent hover:bg-gray-100 hover:text-black hover:border-black transition text-sm font-medium tracking-wide"
      >
        Save Changes
      </button>
    </main>
  );
}

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition';