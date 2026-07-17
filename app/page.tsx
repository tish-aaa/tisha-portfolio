'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';

const SpaceScene = dynamic(() => import('@/components/SpaceScene'), { ssr: false });
const CursorSparkles = dynamic(() => import('@/components/CursorSparkles'), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <SpaceScene />
      <CursorSparkles />
      <div className="relative z-10">
        <Hero />
        <About />
      </div>
    </main>
  );
}