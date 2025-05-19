'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
}

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data } = await api.get<Project[]>('/projects');
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects', err);
      } finally {
        setLoadingProjects(false);
      }
    }
    fetchProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!validateEmail(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      await api.post('/leads', form);
      alert('Lead submitted!');
    } catch (err: any) {
      console.error('Submission error:', err.response?.data || err.message);
      alert('Error submitting lead.');
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

      <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
        Create New Lead
      </h1>

      <div className="space-y-5">
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className={inputClass}
        />

        <hr className="my-6 border-gray-200" />

        <input
          name="gclid"
          placeholder="GCLID (optional)"
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="utmSource"
          placeholder="UTM Source (optional)"
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="utmCampaign"
          placeholder="UTM Campaign (optional)"
          onChange={handleChange}
          className={inputClass}
        />

        <select
          name="sourceProjectId"
          value={form.sourceProjectId}
          onChange={handleChange}
          disabled={loadingProjects}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition disabled:opacity-50"
        >
          <option value="">
            {loadingProjects ? 'Loading projects…' : 'Select Source Project'}
          </option>
          {projects.map((proj) => (
            <option key={proj.id} value={proj.name}>
              {proj.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 w-full bg-black text-white py-3 rounded-xl border border-transparent hover:bg-gray-100 hover:text-black hover:border-black transition text-sm font-medium tracking-wide"
      >
        Submit Lead
      </button>
    </main>
  );
}

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition';
