'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Milestone = {
  date: string;
  title: string;
  org: string;
  desc: string;
};

const milestones: Milestone[] = [
  { date: 'Feb 2023', title: 'Research', org: 'Aavishkaar, Kelkar', desc: 'Formulated a novel idea with societal impact and carried it through presentation and implementation.' },
  { date: 'Jul–Aug 2023', title: 'Web Dev Intern', org: 'Indobricks', desc: 'Researched, designed, and built websites using Wix, HTML, CSS, and Bootstrap 5.' },
  { date: 'Jan–Mar 2024', title: 'Web Dev Tester & Intern', org: 'Variety Tech', desc: 'Tested Ireland-based client sites for functionality, usability, and quality alongside the dev team.' },
  { date: 'Apr 2024 — present', title: 'Full Stack Developer specialized in Front-end', org: 'Variety Tech', desc: 'Building web tools and interfaces for Ireland-based clients — car configurators, lead-gen forms, and more.' },
  { date: '2025', title: 'BSc IT Graduate', org: 'V.G. Vaze Kelkar', desc: '9.1 CGPA. Convocation done, degree in hand.' },
  { date: '2026', title: 'BOD, Club Service', org: 'Rotaract Club of Thane North End', desc: 'Leading service projects, coordinating volunteers, planning and budgeting initiatives.' },
  { date: 'Now', title: 'Pivoting toward Data', org: 'In progress', desc: 'SQL practice, exploring Data Science — building the India Data Center Transparency Tracker on the side.' },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const trackX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(milestones.length - 1) * 100}%`]
  );

  const legAngle = useTransform(scrollYProgress, (v) => (v * 40) % 40);

  return (
    <section id="journey" ref={containerRef} style={{ height: `${milestones.length * 100}vh` }} className="relative z-10">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute left-[6vw] top-16 z-10">
          <div className="mb-5 text-[11px] uppercase tracking-[0.15em] text-[#8E9096]">
            Journey
          </div>
          <h2 className="max-w-[500px] font-garamond text-[clamp(28px,3.5vw,44px)] font-semibold leading-[1.15] text-[#F5F5F7]">
            Scroll to keep moving.
          </h2>
        </div>

        {/* ground line */}
        <div className="absolute bottom-[22%] left-0 h-px w-full bg-[#8E9096]/25" />

        {/* runner — simple animated figure, fixed in place while the
            track scrolls past underneath it */}
        <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2">
          <Runner legAngle={legAngle} />
        </div>

        {/* horizontal track of milestone cards */}
        <motion.div className="flex h-full" style={{ x: trackX }}>
          {milestones.map((m) => (
            <div
              key={m.title}
              className="flex h-full w-screen flex-shrink-0 items-end justify-center pb-[28%]"
            >
              <div className="max-w-[420px] px-6 text-center">
                <div className="mb-2 text-[13px] uppercase tracking-[0.12em] text-[#1FDCD2]">
                  {m.date}
                </div>
                <div className="font-garamond text-[26px] font-semibold text-[#F5F5F7]">
                  {m.title}
                </div>
                <div className="mt-1 text-[14px] text-[#8E9096]">{m.org}</div>
                <p className="mt-3 text-[14px] leading-relaxed text-[#B8BABE]">{m.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* progress dots */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
          {milestones.map((_, i) => (
            <Dot key={i} index={i} total={milestones.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Runner({ legAngle }: { legAngle: MotionValue<number> }) {
  return (
    <svg width="40" height="60" viewBox="0 0 40 60">
      <circle cx="20" cy="10" r="7" className="fill-[#1FDCD2]" />
      <line x1="20" y1="17" x2="20" y2="38" stroke="#F5F5F7" strokeWidth="3" strokeLinecap="round" />
      <motion.line
        x1="20" y1="38" x2="10" y2="58"
        stroke="#F5F5F7" strokeWidth="3" strokeLinecap="round"
        style={{ rotate: legAngle, transformOrigin: '20px 38px' }}
      />
      <motion.line
        x1="20" y1="38" x2="30" y2="58"
        stroke="#F5F5F7" strokeWidth="3" strokeLinecap="round"
        style={{ rotate: useTransform(legAngle, (v: number) => -v), transformOrigin: '20px 38px' }}
      />
      <line x1="20" y1="22" x2="10" y2="30" stroke="#F5F5F7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="22" x2="30" y2="30" stroke="#F5F5F7" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function Dot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, index * step - step / 2), index * step, Math.min(1, index * step + step / 2)],
    [0.3, 1, 0.3]
  );
  return <motion.div className="h-1.5 w-1.5 rounded-full bg-[#1FDCD2]" style={{ opacity }} />;
}