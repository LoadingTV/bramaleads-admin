// src/components/public/CTA.tsx
'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  RocketLaunchIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ClockIcon,
  PlayIcon,
  ArrowRightIcon,
  SparklesIcon,
  GiftIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface CTAFeature {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

const ctaFeatures: CTAFeature[] = [
  { icon: CheckCircleIcon, text: '14-day free trial' },
  { icon: ShieldCheckIcon, text: 'No credit card required' },
  { icon: UserGroupIcon, text: 'Setup in 5 minutes' },
  { icon: ClockIcon, text: '24/7 customer support' }
];

const benefits = [
  'Import your existing data seamlessly',
  'Get personalized onboarding support',
  'Access all premium features during trial',
  'Cancel anytime with no obligations'
];

const stats = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '4.9/5', label: 'Customer Rating' },
  { value: '99.9%', label: 'Uptime SLA' }
];

export default function CTA() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setEmail('');
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <RocketLaunchIcon className="w-5 h-5" />
              <span>Start Your Growth Journey Today</span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Ready to{' '}
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                transform
              </motion.span>
              <br />
              your business?
            </h2>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
              Join thousands of successful companies using Brama CRM to streamline operations, 
              boost productivity, and accelerate growth. Your success story starts here.
            </p>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center items-center gap-8 mb-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-blue-200 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Main CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mb-12">
              <motion.div
                className="flex items-center justify-center mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl">
                  <SparklesIcon className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Start your free trial now
              </h3>
              
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                No credit card required. Full access to all features. 
                Set up in minutes, not hours.
              </p>

              {/* Email Form */}
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      className="w-full px-6 py-4 bg-white/90 text-gray-900 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Starting...</span>
                      </>
                    ) : (
                      <>
                        <RocketLaunchIcon className="w-5 h-5" />
                        <span>Start Free Trial</span>
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-md mx-auto mb-8"
                >
                  <div className="flex items-center justify-center space-x-3 p-6 bg-green-500/20 border border-green-400/50 rounded-xl">
                    <CheckCircleIcon className="w-8 h-8 text-green-400" />
                    <div className="text-left">
                      <p className="text-green-400 font-semibold">Success!</p>
                      <p className="text-green-200 text-sm">Check your email for setup instructions</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {ctaFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.text}
                      className="flex items-center space-x-2 text-blue-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <IconComponent className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{feature.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-blue-200 text-sm">
                Trusted by 10,000+ companies worldwide • SOC 2 certified • GDPR compliant
              </p>
            </div>
          </motion.div>

          {/* Alternative Actions */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <motion.div
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="p-3 bg-blue-500/20 rounded-xl w-fit mx-auto mb-4 group-hover:bg-blue-500/30 transition-colors">
                <PlayIcon className="w-8 h-8 text-blue-400" />
              </div>
              
              <p className="text-blue-200 text-sm mb-4">
                See Brama CRM in action with a personalized demo
              </p>
              <motion.button
                className="text-blue-400 font-medium text-sm flex items-center space-x-1 mx-auto group-hover:text-blue-300 transition-colors"
                whileHover={{ x: 5 }}
              >
                <span>Schedule Demo</span>
                <ArrowRightIcon className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="p-3 bg-purple-500/20 rounded-xl w-fit mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Talk to Sales</h4>
              <p className="text-blue-200 text-sm mb-4">
                Get a customized plan for your business needs
              </p>
              <motion.button
                className="text-purple-400 font-medium text-sm flex items-center space-x-1 mx-auto group-hover:text-purple-300 transition-colors"
                whileHover={{ x: 5 }}
              >
                <span>Contact Sales</span>
                <ArrowRightIcon className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="p-3 bg-green-500/20 rounded-xl w-fit mx-auto mb-4 group-hover:bg-green-500/30 transition-colors">
                <GiftIcon className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Special Offer</h4>
              <p className="text-blue-200 text-sm mb-4">
                Get 3 months free on annual plans this month
              </p>
              <motion.button
                className="text-green-400 font-medium text-sm flex items-center space-x-1 mx-auto group-hover:text-green-300 transition-colors"
                whileHover={{ x: 5 }}
              >
                <span>Claim Offer</span>
                <ArrowRightIcon className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Benefits List */}
          <motion.div 
            variants={itemVariants}
            className="max-w-2xl mx-auto mb-16"
          >
            <h4 className="text-2xl font-semibold text-white mb-6">
              What you get with your free trial:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center space-x-3 text-blue-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                  </div>
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Options */}
          <motion.div 
            variants={itemVariants}
            className="border-t border-white/10 pt-12"
          >
            <h4 className="text-xl font-semibold text-white mb-6">
              Need help getting started?
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <motion.a
                href="mailto:support@bramacrm.com"
                className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <EnvelopeIcon className="w-5 h-5" />
                <span>support@bramacrm.com</span>
              </motion.a>
              
              <motion.a
                href="tel:+1-555-BRAMA-01"
                className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <PhoneIcon className="w-5 h-5" />
                <span>+1 (555) BRAMA-01</span>
              </motion.a>
              
              <motion.button
                className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <CalendarIcon className="w-5 h-5" />
                <span>Book a call</span>
              </motion.button>
            </div>
            
            <div className="flex items-center justify-center space-x-1 mt-6 text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="text-blue-200 ml-2">4.9/5 from 2,500+ reviews</span>
            </div>
          </motion.div>

          {/* Final Urgency Message */}
          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-2xl"
          >
            <div className="flex items-center justify-center space-x-2 text-orange-300 mb-2">
              <ClockIcon className="w-5 h-5" />
              <span className="font-semibold">Limited Time Offer</span>
            </div>
            <p className="text-orange-100 text-sm">
              Start your free trial this month and get 3 months free on any annual plan. 
              Offer expires soon!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}