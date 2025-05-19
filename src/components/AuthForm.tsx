// src/components/AuthForm.tsx
'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export interface FormData {
  name?: string
  email: string
  password: string
  confirmPassword?: string
}

interface AuthFormProps {
  type: 'login' | 'register'
}

export const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    if (type === 'register') {
      if (data.password !== data.confirmPassword) {
        return alert('Passwords do not match')
      }
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: data.name, email: data.email, password: data.password }),
          credentials: 'include',
        })
        alert('Registration successful, please sign in.')
        return router.push('/auth/login')
      } catch {
        return alert('Registration failed')
      }
    } else {
      const res = await signIn('credentials', { ...data, redirect: false })
      if (res?.ok) return router.push('/')
      return alert(res?.error || 'Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {type === 'register' && (
        <div>
          <label className="block text-sm text-white mb-1">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>
      )}

      <div>
        <label className="block text-sm text-white mb-1">Email</label>
        <input
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          })}
          className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-white mb-1">Password</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min length 6' } })}
          className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {type === 'register' && (
        <div>
          <label className="block text-sm text-white mb-1">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm',
              validate: (val) => val === watch('password') || 'Passwords do not match',
            })}
            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl font-medium hover:from-blue-500 hover:to-blue-300 transition"
      >
        {type === 'login' ? 'Sign In' : 'Create Account'}
      </button>
    </form>
  )
}
