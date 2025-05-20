// src/app/leads/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

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

const STATUS_OPTIONS = [
  { label: 'New', value: 'new', color: '#0088FE' },
  { label: 'In Progress', value: 'in_progress', color: '#00C49F' },
  { label: 'Done', value: 'done', color: '#FFBB28' },
  { label: 'Spam', value: 'spam', color: '#FF8042' },
];

export default function LeadDetailPage() {
  const params = useParams();
  const id = params.id as string | undefined;

  if (!id) {
    return (
      <div className="text-center py-10 text-red-500">
        Ошибка: идентификатор лида не найден в URL
      </div>
    );
  }

  const [lead, setLead] = useState<Lead | null>(null);
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
    async function fetchLead() {
      try {
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
      }
    }

    fetchLead();
  }, [id, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    if (!lead) return;

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
          : null,
      scheduledAt: formData.scheduledAt
        ? new Date(formData.scheduledAt).toISOString()
        : null,
    };

    try {
      await api.patch<Lead>(`/leads/${id}`, payload);
      alert('Lead успешно обновлён');
      setLead((prev) =>
        prev ? { ...prev, ...payload, id: prev.id } : prev
      );
    } catch (err: any) {
      console.error('PATCH error:', err.response ?? err);
      alert(
        `Ошибка при обновлении лида: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  if (!lead) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading...
      </div>
    );
  }

  const currentStatus =
    STATUS_OPTIONS.find((opt) => opt.value === watch('status')) ||
    STATUS_OPTIONS.find((opt) => opt.value === lead.status);

  return (
    <main className="min-h-screen bg-white dark:bg-black flex flex-col items-center py-16 px-4">
      <GlassCard className="w-full max-w-3xl p-8 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Lead Details
            </h1>
            <Link
              href="/leads"
              className="underline text-black dark:text-white hover:text-gray-500 transition"
            >
              ← Back
            </Link>
          </div>

          <div className="flex items-center mb-6">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ background: currentStatus?.color }}
            />
            <span
              className="uppercase tracking-widest font-semibold text-md"
              style={{ color: currentStatus?.color }}
            >
              {currentStatus?.label}
            </span>
            {lead.isSpam && (
              <span className="ml-4 px-3 py-1 text-xs font-bold rounded-full bg-[#FF8042]/10 text-[#FF8042] border border-[#FF8042]">
                SPAM
              </span>
            )}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              {...register('firstName', { required: true })}
              placeholder="First Name"
              className="input-style"
            />
            <input
              {...register('lastName', { required: true })}
              placeholder="Last Name"
              className="input-style"
            />
            <input
              {...register('email', { required: true })}
              placeholder="Email"
              className="input-style"
            />
            <input
              {...register('phone', { required: true })}
              placeholder="Phone"
              className="input-style"
            />
            <input
              {...register('gclid')}
              placeholder="GCLID"
              className="input-style"
            />
            <input
              {...register('cost', { valueAsNumber: true })}
              type="number"
              step="0.01"
              placeholder="Cost (€)"
              className="input-style"
            />
            <input
              {...register('scheduledAt')}
              type="datetime-local"
              className="input-style"
            />

            <input
              value={lead.sourceProject?.name ?? ''}
              disabled
              className="input-style opacity-60"
              placeholder="Project"
            />

            <input
              value={lead.manager?.name ?? ''}
              disabled
              className="input-style opacity-60"
              placeholder="Manager"
            />

            <input
              value={lead.ipAddress ?? ''}
              disabled
              className="input-style opacity-60"
              placeholder="IP Address"
            />

            <div className="col-span-1 md:col-span-2 flex gap-4 items-center">
              <select
                {...register('status')}
                className="input-style w-44"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 text-black dark:text-white">
                <input
                  type="checkbox"
                  {...register('isSpam')}
                  className="accent-[#FF8042]"
                />
                Mark as spam
              </label>
            </div>

            <textarea
              {...register('utmSource')}
              placeholder="UTM Source (optional)"
              className="input-style md:col-span-2"
              rows={2}
            />
            <textarea
              {...register('utmCampaign')}
              placeholder="UTM Campaign (optional)"
              className="input-style md:col-span-2"
              rows={2}
            />

            <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-900 transition duration-300"
              >
                Save Changes
              </button>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-right">
                <div>Created: {new Date(lead.createdAt).toLocaleString()}</div>
                <div>Updated: {new Date(lead.updatedAt).toLocaleString()}</div>
                <div>
                  ID: <span className="font-mono">{lead.id}</span>
                </div>
              </span>
            </div>
          </form>
        </motion.div>
      </GlassCard>
    </main>
  );
}
