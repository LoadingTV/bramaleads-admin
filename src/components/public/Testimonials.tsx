// src/components/public/Testimonials.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/GlassCard';
import { 
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
  PlayIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  companyLogo?: string;
  avatar: string;
  rating: number;
  text: string;
  longText?: string;
  industry: string;
  companySize: string;
  results: {
    metric: string;
    improvement: string;
    description: string;
  }[];
  videoUrl?: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    position: 'CEO & Founder',
    company: 'TechStart Solutions',
    avatar: 'SM',
    rating: 5,
    text: 'Brama CRM transformed our lead management process. We saw a 40% increase in conversion rates within the first month.',
    longText: 'Before Brama CRM, we were struggling to keep track of our leads and follow-ups. The team was using spreadsheets and losing potential customers. Since implementing Brama, our conversion rates increased by 40% and our team productivity doubled.',
    industry: 'Technology',
    companySize: '25-50 employees',
    results: [
      { metric: 'Conversion Rate', improvement: '+40%', description: 'Lead to customer conversion' },
      { metric: 'Team Productivity', improvement: '+100%', description: 'Daily tasks completed' },
      { metric: 'Response Time', improvement: '-60%', description: 'Average lead response' }
    ],
    featured: true
  },
  {
    id: '2',
    name: 'Marcus Chen',
    position: 'Sales Director',
    company: 'Global Industries',
    avatar: 'MC',
    rating: 5,
    text: 'The analytics and reporting features give us insights we never had before. Our team performance has never been better.',
    longText: 'The depth of analytics that Brama CRM provides is incredible. We can track every touchpoint with our customers and optimize our sales process based on real data. Our sales team loves the intuitive interface.',
    industry: 'Manufacturing',
    companySize: '200+ employees',
    results: [
      { metric: 'Sales Efficiency', improvement: '+35%', description: 'Revenue per sales rep' },
      { metric: 'Data Accuracy', improvement: '+95%', description: 'Clean customer data' },
      { metric: 'Forecast Accuracy', improvement: '+50%', description: 'Sales predictions' }
    ]
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    position: 'Marketing Manager',
    company: 'Creative Agency Pro',
    avatar: 'ER',
    rating: 5,
    text: 'Perfect for agencies! Client management is seamless and the project tracking features are exactly what we needed.',
    longText: 'As a creative agency, we needed a CRM that could handle complex client relationships and project workflows. Brama CRM delivers on both fronts with an elegant, user-friendly interface.',
    industry: 'Creative Services',
    companySize: '10-25 employees',
    results: [
      { metric: 'Client Satisfaction', improvement: '+45%', description: 'NPS score improvement' },
      { metric: 'Project Delivery', improvement: '+30%', description: 'On-time completion' },
      { metric: 'Revenue Growth', improvement: '+55%', description: 'Year over year' }
    ],
    videoUrl: '#'
  },
  {
    id: '4',
    name: 'David Kim',
    position: 'Operations Head',
    company: 'E-commerce Plus',
    avatar: 'DK',
    rating: 5,
    text: 'The automation features saved us countless hours. We can now focus on what matters most - our customers.',
    longText: 'The workflow automation in Brama CRM has been a game-changer for our e-commerce business. We automated our entire customer journey from lead capture to post-purchase follow-up.',
    industry: 'E-commerce',
    companySize: '50-100 employees',
    results: [
      { metric: 'Time Saved', improvement: '+25 hrs/week', description: 'Automated processes' },
      { metric: 'Customer Retention', improvement: '+32%', description: 'Repeat purchases' },
      { metric: 'Order Processing', improvement: '+70%', description: 'Faster fulfillment' }
    ]
  },
  {
    id: '5',
    name: 'Jennifer Park',
    position: 'Business Development',
    company: 'FinTech Innovations',
    avatar: 'JP',
    rating: 5,
    text: 'Security and compliance features are top-notch. Essential for our financial services business.',
    longText: 'In the financial services industry, security and compliance are non-negotiable. Brama CRM not only meets all our regulatory requirements but also provides the functionality we need to grow our business.',
    industry: 'Financial Services',
    companySize: '100-200 employees',
    results: [
      { metric: 'Compliance Score', improvement: '100%', description: 'Regulatory adherence' },
      { metric: 'Security Incidents', improvement: '-90%', description: 'Data breaches prevented' },
      { metric: 'Client Onboarding', improvement: '+40%', description: 'Faster processing' }
    ]
  },
  {
    id: '6',
    name: 'Alex Thompson',
    position: 'Founder',
    company: 'Startup Hub',
    avatar: 'AT',
    rating: 5,
    text: 'Started with the free trial and never looked back. Scales perfectly as we grow.',
    longText: 'We started using Brama CRM when we were just a 3-person startup. Now we&apos;re a team of 30 and the platform has scaled beautifully with us. The pricing is fair and the features keep getting better.',
    industry: 'Consulting',
    companySize: '25-50 employees',
    results: [
      { metric: 'Business Growth', improvement: '+200%', description: 'Team expansion' },
      { metric: 'Client Base', improvement: '+300%', description: 'Active customers' },
      { metric: 'Revenue Growth', improvement: '+250%', description: 'Year over year' }
    ]
  }
];

const companyLogos = [
  'TechStart', 'Global Inc', 'Creative Pro', 'E-commerce+', 'FinTech', 'Startup Hub',
  'Innovation Labs', 'Business Solutions', 'Digital Agency', 'Growth Partners'
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarSolidIcon
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const featuredTestimonial = testimonials.find(t => t.featured) || testimonials[0];
 

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
            className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <StarIcon className="w-4 h-4" />
            <span>Customer Success Stories</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Loved by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
              10,000+ businesses
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            See how companies across industries are transforming their customer relationships 
            and growing their business with Brama CRM.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <GlassCard className="relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
            <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(featuredTestimonial.rating)}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    ({featuredTestimonial.rating}.0)
                  </span>
                </div>
                
                <blockquote className="text-2xl font-medium text-gray-900 dark:text-white leading-relaxed mb-6">
                  &ldquo;{featuredTestimonial.longText || featuredTestimonial.text}&rdquo;
                </blockquote>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {featuredTestimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {featuredTestimonial.name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {featuredTestimonial.position}
                    </div>
                    <div className="text-blue-600 dark:text-blue-400 font-medium">
                      {featuredTestimonial.company}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="grid grid-cols-3 gap-4 max-w-xs">
                  {featuredTestimonial.results.map((result, index) => (
                    <motion.div
                      key={result.metric}
                      className="text-center p-4 bg-white/50 dark:bg-slate-700/30 rounded-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                        {result.improvement}
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {result.metric}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {result.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                What our customers say
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevious}
                  className="p-2 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 bg-white/70 dark:bg-slate-800/70 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial) => (
                    <GlassCard
                      key={testimonial.id}
                      animate={false}
                      className="h-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                      onClick={() => setSelectedTestimonial(testimonial)}
                    >
                      <div className="flex items-center space-x-1 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        &ldquo;{testimonial.text}&rdquo;
                      </blockquote>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {testimonial.avatar}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white text-sm">
                              {testimonial.name}
                            </div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">
                              {testimonial.position}
                            </div>
                            <div className="text-blue-600 dark:text-blue-400 text-xs font-medium">
                              {testimonial.company}
                            </div>
                          </div>
                        </div>
                        
                        {testimonial.videoUrl && (
                          <motion.button
                            className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <PlayIcon className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </GlassCard>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Trusted by industry leaders worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {companyLogos.map((company, logoIndex) => (
              <motion.div
                key={company}
                className="flex items-center justify-center p-4 bg-white/50 dark:bg-slate-800/30 rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + logoIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-gray-600 dark:text-gray-400 font-semibold text-sm">
                  {company}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {[
            { icon: TrophyIcon, value: '4.9/5', label: 'Average Rating', color: 'from-yellow-500 to-orange-500' },
            { icon: UserGroupIcon, value: '10,000+', label: 'Happy Customers', color: 'from-blue-500 to-blue-600' },
            { icon: ChartBarIcon, value: '95%', label: 'Customer Retention', color: 'from-green-500 to-green-600' },
            { icon: BuildingOfficeIcon, value: '50+', label: 'Countries', color: 'from-purple-500 to-purple-600' }
          ].map((stat, statIndex) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + statIndex * 0.1 }}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-4 text-blue-200" />
            <h3 className="text-2xl font-bold mb-4">
              Ready to join our success stories?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start your free trial today and see why thousands of businesses choose Brama CRM 
              to grow their customer relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Free Trial
              </motion.button>
              <motion.button
                className="px-8 py-3 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View More Stories
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Detailed Testimonial Modal */}
        <AnimatePresence>
          {selectedTestimonial && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
            >
              <motion.div
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedTestimonial.rating)}
                  </div>
                  <button
                    onClick={() => setSelectedTestimonial(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <blockquote className="text-xl text-gray-900 dark:text-white leading-relaxed mb-6">
                  &ldquo;{selectedTestimonial.longText || selectedTestimonial.text}&rdquo;
                </blockquote>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {selectedTestimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-lg">
                      {selectedTestimonial.name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {selectedTestimonial.position}
                    </div>
                    <div className="text-blue-600 dark:text-blue-400 font-medium">
                      {selectedTestimonial.company}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Industry:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTestimonial.industry}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Company Size:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTestimonial.companySize}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Key Results:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedTestimonial.results.map((result) => (
                      <div key={result.metric} className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                          {result.improvement}
                        </div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {result.metric}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {result.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}