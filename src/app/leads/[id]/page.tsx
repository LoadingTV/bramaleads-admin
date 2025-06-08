// src/app/leads/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import { 
  ArrowLeftIcon, 
  UserIcon, 
  EnvelopeIcon, 
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gclid?: string;
  utmSource?: string;
  utmCampaign?: string;
  sourceProject?: { id: string; name: string } | null;
  status: string;
  isSpam: boolean;
  cost?: number;
  scheduledAt?: string;
  manager?: { id: string; name: string } | null;
  ipAddress?: string | null;
  createdAt: string;
  updatedAt: string;
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gclid?: string;
  utmSource?: string;
  utmCampaign?: string;
  status: Lead['status'];
  isSpam: boolean;
  cost?: number;
  scheduledAt?: string;
};

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const STATUS_OPTIONS = [
  { label: 'New', value: 'new', color: '#0088FE', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
  { label: 'In Progress', value: 'in_progress', color: '#00C49F', bgColor: 'bg-green-100 dark:bg-green-900/30' },
  { label: 'Done', value: 'done', color: '#FFBB28', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
  { label: 'Spam', value: 'spam', color: '#FF8042', bgColor: 'bg-red-100 dark:bg-red-900/30' },
];

export default function LeadDetailPage() {
  const params = useParams();
  const id = params.id as string | undefined;
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      status: 'new',
      isSpam: false,
    },
  });

  useEffect(() => {
    if (!id) return;
    
    async function fetchLead() {
      try {
        setIsLoading(true);
        const res = await api.get<Lead>(`/leads/${id}`);
        setLead(res.data);

        const scheduledAtLocal = res.data.scheduledAt
          ? (() => {
              const dt = new Date(res.data.scheduledAt);
              const tzOffset = dt.getTimezoneOffset() * 60000;
              return new Date(dt.getTime() - tzOffset)
                .toISOString()
                .slice(0, 16);
            })()
          : undefined;

        reset({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phone: res.data.phone,
          gclid: res.data.gclid || undefined,
          utmSource: res.data.utmSource || undefined,
          utmCampaign: res.data.utmCampaign || undefined,
          status: res.data.status,
          isSpam: res.data.isSpam,
          cost: res.data.cost ?? undefined,
          scheduledAt: scheduledAtLocal,
        });
      } catch (err) {
        console.error('Fetch lead error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLead();
  }, [id, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    if (!lead || !id) return;

    const payload: Partial<Lead> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      gclid: formData.gclid,
      utmSource: formData.utmSource,
      utmCampaign: formData.utmCampaign,
      status: formData.status,
      isSpam: formData.isSpam,
      cost:
        typeof formData.cost === 'number' && !isNaN(formData.cost)
          ? formData.cost
          : undefined,
      scheduledAt: formData.scheduledAt
        ? new Date(formData.scheduledAt).toISOString()
        : undefined,
    };

    setIsSaving(true);
    try {
      await api.patch<Lead>(`/leads/${id}`, payload);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      setLead((prev) =>
        prev ? { ...prev, ...payload, id: prev.id } : prev
      );
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error('PATCH error:', err.response ?? err);
      alert(
        `Error updating lead: ${
          err.response?.data?.message || err.message || 'Unknown error'
        }`
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!id) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16 flex justify-center items-center">
        <div className="text-center text-red-500">
          <ExclamationTriangleIcon className="w-16 h-16 mx-auto mb-4" />
          <p className="text-xl">Lead ID not found in URL</p>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading lead details...</p>
        </div>
      </main>
    );
  }

  if (!lead) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ml-64 pt-16 flex justify-center items-center">
        <div className="text-center text-red-500">
          <ExclamationTriangleIcon className="w-16 h-16 mx-auto mb-4" />
          <p className="text-xl">Lead not found</p>
        </div>
      </main>
    );
  }

  const currentStatus =
    STATUS_OPTIONS.find((opt) => opt.value === watch('status')) ||
    STATUS_OPTIONS.find((opt) => opt.value === lead.status);

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
          <Link href="/leads">
            <motion.button
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Leads</span>
            </motion.button>
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {lead.firstName} {lead.lastName}
              </h1>
              <div className="flex items-center space-x-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentStatus?.bgColor}`}
                  style={{ color: currentStatus?.color }}
                >
                  <span
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: currentStatus?.color }}
                  />
                  {currentStatus?.label}
                </span>
                {lead.isSpam && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                    Spam
                  </span>
                )}
              </div>
            </div>
            
            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
              <p>Created: {new Date(lead.createdAt).toLocaleString()}</p>
              <p>Updated: {new Date(lead.updatedAt).toLocaleString()}</p>
              <p className="font-mono">ID: {lead.id}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <GlassCard delay={0.2}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <UserIcon className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      {...register('firstName', { required: true })}
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      {...register('lastName', { required: true })}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <EnvelopeIcon className="w-5 h-5 mr-2" />
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <input
                      {...register('email', { required: true })}
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      {...register('phone', { required: true })}
                      type="tel"
                      placeholder="Phone"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Additional Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      {...register('gclid')}
                      placeholder="GCLID"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      {...register('cost', { valueAsNumber: true })}
                      type="number"
                      step="0.01"
                      placeholder="Cost (€)"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <input
                      {...register('scheduledAt')}
                      type="datetime-local"
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* UTM Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Marketing Information
                  </h3>
                  <div className="space-y-4">
                    <textarea
                      {...register('utmSource')}
                      placeholder="UTM Source (optional)"
                      rows={2}
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                    <textarea
                      {...register('utmCampaign')}
                      placeholder="UTM Campaign (optional)"
                      rows={2}
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      {...register('status')}
                      className="w-full px-4 py-3 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      {...register('isSpam')}
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span>Mark as spam</span>
                  </label>
                  
                  <motion.button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: isSaving ? 1 : 1.02 }}
                    whileTap={{ scale: isSaving ? 1 : 0.98 }}
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : isSaved ? (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </motion.button>
                </div>
              </form>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Lead Info */}
            <GlassCard title="Lead Information" delay={0.3}>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Project</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {lead.sourceProject?.name || 'Not assigned'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Manager</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {lead.manager?.name || 'Not assigned'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">IP Address</p>
                  <p className="font-mono text-sm text-gray-900 dark:text-white">
                    {lead.ipAddress || 'Unknown'}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard title="Quick Actions" delay={0.4}>
              <div className="space-y-3">
                <motion.button
                  className="w-full py-2 px-4 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-800 dark:text-green-300 rounded-lg transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  📞 Call Lead
                </motion.button>
                <motion.button
                  className="w-full py-2 px-4 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-800 dark:text-blue-300 rounded-lg transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  ✉️ Send Email
                </motion.button>
                <motion.button
                  className="w-full py-2 px-4 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 rounded-lg transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  📅 Schedule Meeting
                </motion.button>
                <motion.button
                  className="w-full py-2 px-4 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-800 dark:text-red-300 rounded-lg transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                >
                  🗑️ Delete Lead
                </motion.button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}