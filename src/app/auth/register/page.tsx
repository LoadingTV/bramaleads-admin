// src/app/auth/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data: RegisterData) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await api.post('/auth/register', data);
      alert('Registration successful – please sign in.');
      router.push('/auth/login');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-16 px-6 py-10 bg-white shadow-sm rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
        Create Account
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          placeholder="Name"
          {...register('name', { required: 'Name is required' })}
          className={inputClass}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          })}
          className={inputClass}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'At least 6 characters' } })}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-black transition"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Confirm Password"
            {...register('confirmPassword', { required: 'Please confirm your password' })}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-black transition"
          >
            {showConfirm ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-100 hover:text-black border border-transparent hover:border-black transition text-sm font-medium"
        >
          {isSubmitting ? 'Creating…' : 'Create Account'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/auth/login" className="underline hover:text-black transition">
          Sign In
        </Link>
      </p>
    </main>
  );
}
