// src/app/pricing/page.tsx
'use client';

import React from 'react';
import PublicHeader from '@/components/public/PublicHeader';
import Pricing from '@/components/public/Pricing';


export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Public Header */}
      <PublicHeader />
      
      {/* Pricing Section */}
      <div >
        <Pricing />
      </div>
      
   
      
  
    </div>
  );
}