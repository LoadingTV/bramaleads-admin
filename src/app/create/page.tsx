'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../../lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { 
  UserIcon, 
  EnvelopeIcon, 
  ArrowLeftIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gclid: string;
  utmSource: string;
  utmCampaign: string;
  sourceProjectId: string;
}

interface Project {
  id: string;
  name: string;
}

interface AxiosErrorLike {
  response?: {
    data?: string;
  };
  message?: string;
}

export default function CreateLeadPage() {
  const [form, setForm] = useState<FormData>({
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (!form.firstName.trim() || !form.lastName.trim()) {
      alert('Please enter first and last name.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/leads', form);
      alert('Lead submitted successfully!');
      // Reset form
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gclid: '',
        utmSource: '',
        utmCampaign: '',
        sourceProjectId: '',
      });
    } catch (err: unknown) {
      let errorMessage = 'Unknown error';

      if (typeof err === 'object' && err !== null) {
        const e = err as AxiosErrorLike;
        if (e.response && e.response.data) {
          errorMessage = e.response.data;
        } else if (e.message) {
          errorMessage = e.message;
        }
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      console.error('Submission error:', errorMessage);
      alert('Error submitting lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16">
      <div className="p-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/">
            <motion.button
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </motion.button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Create New Lead
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add a new potential customer to your CRM system
          </p>
        </motion.div>

        {/* Form */}
        <div className="max-w-2xl">
          <GlassCard className="p-8" delay={0.2}>
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <UserIcon className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      name="firstName"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full pl-4 pr-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      name="lastName"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full pl-4 pr-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full pl-4 pr-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full pl-4 pr-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Marketing Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Marketing Information
                </h3>
                <div className="space-y-4">
                  <input
                    name="gclid"
                    placeholder="GCLID (optional)"
                    value={form.gclid}
                    onChange={handleChange}
                    className="w-full pl-4 pr-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    name="utmSource"
                    placeholder="UTM Source (optional)"
                    value={form.utmSource}
                    onChange={handleChange}
                    className="w-full pl-4 pr-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <input
                    name="utmCampaign"
                    placeholder="UTM Campaign (optional)"
                    value={form.utmCampaign}
                    onChange={handleChange}
                    className="w-full pl-4 pr-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <select
                    name="sourceProjectId"
                    value={form.sourceProjectId}
                    onChange={handleChange}
                    disabled={loadingProjects}
                    className="w-full pl-4 pr-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
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
              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <PlusIcon className="w-5 h-5" />
                    <span>Create Lead</span>
                  </>
                )}
              </motion.button>
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}