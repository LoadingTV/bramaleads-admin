// src/app/auth/register/page.tsx
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>()

  const onSubmit = async (data: RegisterData) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    try {
      await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      alert('Registration successful – please sign in.')
      router.push('/auth/login')
    } catch (err: any) {
      console.error(err)
      alert(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black p-6">
      <div className="card">
        <h1 className="text-2xl font-semibold text-fg mb-6">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm text-fg">Name</label>
            <input
              id="name"
              {...register('name', { required: 'Name is required' })}
              className="input"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-fg">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
              })}
              className="input"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-fg">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'At least 6 characters' },
                })}
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 text-fg hover:text-black dark:hover:text-white transition"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-sm text-fg">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (val) => val === watch('password') || 'Passwords do not match',
                })}
                className="input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 right-0 px-3 text-fg hover:text-black dark:hover:text-white transition"
              >
                {showConfirm ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? 'Creating…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-4 text-center text-fg">
          Already have an account?{' '}
          <Link href="/auth/login" className="underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  )
}
