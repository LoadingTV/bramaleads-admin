// src/components/public/Pricing.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { 
  CheckIcon,
  XMarkIcon,
  CurrencyEuroIcon,
  StarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  PhoneIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular?: boolean;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  limitations?: string[];
  maxUsers: number | 'unlimited';
  storage: string;
  support: string;
  buttonText: string;
  buttonVariant: 'primary' | 'secondary' | 'premium';
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams getting started with CRM',
    monthlyPrice: 29,
    yearlyPrice: 290,
    color: 'from-blue-500 to-blue-600',
    icon: UserGroupIcon,
    maxUsers: 5,
    storage: '10 GB',
    support: 'Email support',
    buttonText: 'Start Free Trial',
    buttonVariant: 'secondary',
    features: [
      'Up to 5 team members',
      'Lead management',
      'Basic reporting',
      'Email integration',
      'Mobile app access',
      'Standard templates',
      '24/7 email support'
    ],
    limitations: [
      'Limited customization',
      'Basic analytics only',
      'No API access'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Advanced features for growing businesses',
    monthlyPrice: 79,
    yearlyPrice: 790,
    isPopular: true,
    color: 'from-green-500 to-green-600',
    icon: ChartBarIcon,
    maxUsers: 25,
    storage: '100 GB',
    support: 'Priority support + Phone',
    buttonText: 'Start Free Trial',
    buttonVariant: 'primary',
    features: [
      'Up to 25 team members',
      'Advanced lead scoring',
      'Custom dashboards',
      'Advanced reporting',
      'API access',
      'Custom fields',
      'Workflow automation',
      'Third-party integrations',
      'Priority support',
      'Advanced analytics',
      'Custom templates'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Complete solution for large organizations',
    monthlyPrice: 149,
    yearlyPrice: 1490,
    color: 'from-purple-500 to-purple-600',
    icon: ShieldCheckIcon,
    maxUsers: 'unlimited',
    storage: '1 TB',
    support: 'Dedicated account manager',
    buttonText: 'Contact Sales',
    buttonVariant: 'premium',
    features: [
      'Unlimited team members',
      'Advanced security features',
      'Custom branding',
      'Advanced integrations',
      'Custom development',
      'Dedicated support',
      'Training sessions',
      'SLA guarantee',
      'Advanced permissions',
      'Multi-language support',
      'White-label options',
      'On-premise deployment'
    ]
  }
];

const faqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'We offer a 14-day free trial for all paid plans. No credit card required to get started.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all new subscriptions.'
  }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

 const getButtonStyles = (variant: string, isPopular?: boolean) => {
  if (isPopular) {
    return 'ring-2 ring-green-500';
  }
  switch (variant) {
    case 'primary':
      return 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800';
    case 'premium':
      return 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800';
    default:
      return 'bg-white dark:bg-slate-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400';
  }
}

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <CurrencyEuroIcon className="w-4 h-4" />
            <span>Simple Pricing</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Choose the perfect{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              plan for your team
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Start with our free trial and scale as you grow. All plans include our core features 
            with 24/7 support and a 30-day money-back guarantee.
          </p>

          {/* Billing Toggle */}
          <motion.div
            className="inline-flex items-center bg-white/70 dark:bg-slate-800/70 rounded-xl p-1 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                !isYearly 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all relative ${
                isYearly 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const savings = isYearly ? plan.monthlyPrice * 12 - plan.yearlyPrice : 0;
            
            return (
              <motion.div
                key={plan.id}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.6 }}
              >
                {plan.isPopular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <StarIcon className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </motion.div>
                )}
                
                <GlassCard 
                  animate={false} 
                  className={`h-full transition-all duration-300 ${
                    plan.isPopular 
                      ? 'ring-2 ring-green-500 hover:ring-green-400 scale-105' 
                      : 'hover:scale-105'
                  }`}
                >
                  <div className="text-center mb-6">
                    <motion.div
                      className={`inline-flex p-3 bg-gradient-to-br ${plan.color} rounded-xl mb-4`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <div className="flex items-center justify-center space-x-1">
                        <CurrencyEuroIcon className="w-6 h-6 text-gray-400" />
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          /{isYearly ? 'year' : 'month'}
                        </span>
                      </div>
                      {isYearly && savings > 0 && (
                        <motion.p
                          className="text-green-600 dark:text-green-400 text-sm font-medium mt-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Save €{savings} per year
                        </motion.p>
                      )}
                    </div>

                    <motion.button
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${getButtonStyles(plan.buttonVariant, plan.isPopular)}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.buttonText}
                    </motion.button>
                  </div>

                  {/* Plan Details */}
                  <div className="space-y-4 border-t border-gray-200/50 dark:border-slate-700/50 pt-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Users:</span>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {plan.maxUsers === 'unlimited' ? 'Unlimited' : `Up to ${plan.maxUsers}`}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Storage:</span>
                        <p className="font-semibold text-gray-900 dark:text-white">{plan.storage}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">Support:</span>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{plan.support}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Whats included:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + index * 0.1 + featureIndex * 0.02 }}
                        >
                          <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {plan.limitations && (
                      <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-slate-700/50">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Limitations:
                        </h5>
                        <ul className="space-y-1">
                          {plan.limitations.map((limitation) => (
                            <li
                              key={limitation}
                              className="flex items-start space-x-2 text-xs text-gray-500 dark:text-gray-500"
                            >
                              <XMarkIcon className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have questions? Were here to help. Cant find what youre looking for? 
              Contact our support team.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <SparklesIcon className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
            <h3 className="text-2xl font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our team is here to help you find the perfect plan for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneIcon className="w-5 h-5" />
                <span>Schedule a Call</span>
              </motion.button>
              <motion.button
                className="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Sales
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}