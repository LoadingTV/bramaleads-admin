// src/app/auth/register/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: string;
  acceptTerms: boolean;
}

interface PasswordRequirement {
  text: string;
  met: boolean;
}

interface RegisterError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterData>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [registrationStep, setRegistrationStep] = useState<'form' | 'success' | 'error'>('form');
  const [errorMessage, setErrorMessage] = useState('');

  const password = watch('password') || '';
  const confirmPassword = watch('confirmPassword') || '';

  // Password requirements
  const passwordRequirements: PasswordRequirement[] = [
    { text: 'At least 8 characters long', met: password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { text: 'Contains number', met: /\d/.test(password) },
    { text: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { text: 'Passwords match', met: password === confirmPassword && password.length > 0 }
  ];

  const getPasswordStrength = () => {
    const metRequirements = passwordRequirements.filter(req => req.met).length;
    if (metRequirements < 2) return { strength: 'weak', color: 'bg-red-500', width: 20 };
    if (metRequirements < 4) return { strength: 'fair', color: 'bg-yellow-500', width: 50 };
    if (metRequirements < 5) return { strength: 'good', color: 'bg-blue-500', width: 75 };
    return { strength: 'strong', color: 'bg-green-500', width: 100 };
  };

  const passwordStrength = getPasswordStrength();

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    if (!data.acceptTerms) {
      setErrorMessage('You must accept the Terms of Service and Privacy Policy');
      return;
    }

    const unmetRequirements = passwordRequirements.filter(req => !req.met);
    if (unmetRequirements.length > 0) {
      setErrorMessage('Please ensure all password requirements are met');
      return;
    }

    try {
      setErrorMessage('');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setRegistrationStep('success');
      
      // Auto redirect after 3 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
      
    } catch (error: unknown) {
      const err = error as RegisterError;
      console.error('Registration error:', err);
      setErrorMessage(err.response?.data?.message || 'Registration failed. Please try again.');
      setRegistrationStep('error');
    }
  };

  if (registrationStep === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <motion.div
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckIcon className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to Brama CRM!</h1>
          <p className="text-gray-300 mb-6">
            Your account has been created successfully. You will be redirected to the login page shortly.
          </p>
          <div className="flex items-center justify-center space-x-2 text-blue-400">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-white font-bold text-2xl">B</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Join Brama CRM</h1>
          <p className="text-gray-300">Create your account to get started</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center space-x-3"
            >
              <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
              <span className="text-red-300 text-sm">{errorMessage}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  placeholder="Enter your full name"
                  {...register('fullName', { 
                    required: 'Full name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { 
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                      message: 'Please enter a valid email address' 
                    },
                  })}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </motion.div>

            {/* Department */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Department *
              </label>
              <select
                {...register('department', { required: 'Please select a department' })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="" className="text-gray-900">Select Department</option>
                <option value="Sales" className="text-gray-900">Sales</option>
                <option value="Marketing" className="text-gray-900">Marketing</option>
                <option value="Engineering" className="text-gray-900">Engineering</option>
                <option value="Design" className="text-gray-900">Design</option>
                <option value="Product" className="text-gray-900">Product</option>
                <option value="Support" className="text-gray-900">Support</option>
                <option value="HR" className="text-gray-900">Human Resources</option>
                <option value="Finance" className="text-gray-900">Finance</option>
              </select>
              {errors.department && (
                <p className="text-red-400 text-sm mt-1">{errors.department.message}</p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password *
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength */}
              {password && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Password Strength</span>
                    <span className={`text-xs font-medium capitalize ${
                      passwordStrength.strength === 'weak' ? 'text-red-400' :
                      passwordStrength.strength === 'fair' ? 'text-yellow-400' :
                      passwordStrength.strength === 'good' ? 'text-blue-400' : 'text-green-400'
                    }`}>
                      {passwordStrength.strength}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <motion.div
                      className={`h-2 rounded-full ${passwordStrength.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength.width}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="space-y-1">
                    {passwordRequirements.slice(0, 5).map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        {req.met ? (
                          <CheckIcon className="w-3 h-3 text-green-400" />
                        ) : (
                          <XMarkIcon className="w-3 h-3 text-gray-400" />
                        )}
                        <span className={req.met ? 'text-green-400' : 'text-gray-400'}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  {...register('confirmPassword', { required: 'Please confirm your password' })}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirm ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Match Indicator */}
              {confirmPassword && (
                <div className="mt-2 flex items-center space-x-2 text-xs">
                  {password === confirmPassword ? (
                    <>
                      <CheckIcon className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <XMarkIcon className="w-3 h-3 text-red-400" />
                      <span className="text-red-400">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-start space-x-3"
            >
              <input
                type="checkbox"
                {...register('acceptTerms', { required: 'You must accept the terms' })}
                className="mt-1 w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label className="text-sm text-gray-300 leading-relaxed">
                I agree to the{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </button>
                . I understand that my data will be processed according to these agreements.
              </label>
            </motion.div>
            {errors.acceptTerms && (
              <p className="text-red-400 text-sm">{errors.acceptTerms.message}</p>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CheckIcon className="w-5 h-5" />
                  <span>Create Account</span>
                </div>
              )}
            </motion.button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Security Note */}
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
            <ShieldCheckIcon className="w-4 h-4" />
            <span>Your data is encrypted and secure</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}