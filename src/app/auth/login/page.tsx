// src/app/auth/login/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LoginData {
  email: string;
  password: string;
}

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition';

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginData) => {
    const res = await signIn('credentials', { ...data, redirect: false });
    if (res?.ok) router.push('/');
    else alert(res?.error || 'Login failed');
  };

  return (
    <main className="max-w-xl mx-auto mt-16 px-6 py-10 bg-white shadow-sm rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
        Sign In
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: 'Email is required' })}
          className={inputClass}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-100 hover:text-black border border-transparent hover:border-black transition text-sm font-medium"
        >
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <Link href="/auth/register" className="underline hover:text-black transition">
          Register
        </Link>
      </p>
    </main>
  );
}
