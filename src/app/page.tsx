// src/app/page.tsx
'use client';

import React from 'react';
import PublicHeader from '@/components/public/PublicHeader';
import Hero from '@/components/public/Hero';
import Footer from '@/components/public/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Public Header */}
      <PublicHeader />
      
      {/* Hero Section */}
      <Hero />
      
 
      {/* Footer */}
      <Footer />
    </div>
  );
}