'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';

const SpaceScene = dynamic(() => import('@/components/SpaceScene'), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-midnight">
      <SpaceScene />
      <Hero />
    </main>
  );
}
