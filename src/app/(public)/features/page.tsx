// src/app/features/page.tsx
'use client';

import React from 'react';
import PublicHeader from '@/components/public/PublicHeader';
import Features from '@/components/public/Features';


export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      {/* Public Header */}
      <PublicHeader />
      
      {/* Features Section */}
      <div >
        <Features />
      </div>
      
   
      
   
    </div>
  );
}