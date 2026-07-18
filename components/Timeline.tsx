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
  { date: 'Now', title: 'Building', org: 'India Data Center Transparency Tracker', desc: 'A crowdsourced platform tracking data center construction against drought and groundwater-stress risk.' },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="journey" className="relative z-10 px-[6vw] py-32">
      <div className="mb-20">
        <div className="mb-5 text-[11px] uppercase tracking-[0.15em] text-[#8E9096]">
          Journey
        </div>
        <h2 className="max-w-[500px] font-garamond text-[clamp(28px,3.5vw,44px)] font-semibold leading-[1.15] text-[#F5F5F7]">
          How I got here.
        </h2>
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-[900px]">
        {/* base track */}
        <div className="absolute left-[7px] top-0 h-full w-px bg-[#8E9096]/20 md:left-1/2 md:-translate-x-1/2" />
        {/* glowing fill that grows as you scroll through the section */}
        <motion.div
          className="absolute left-[7px] top-0 w-px bg-[#1FDCD2] shadow-[0_0_8px_rgba(31,220,210,0.6)] md:left-1/2 md:-translate-x-1/2"
          style={{ height: lineHeight }}
        />

        <div className="flex flex-col gap-16">
          {milestones.map((m, i) => (
            <TimelineRow key={m.title} milestone={m} index={i} progress={scrollYProgress} total={milestones.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineRow({
  milestone,
  index,
  progress,
  total,
}: {
  milestone: Milestone;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const isRight = index % 2 === 1;
  const activeAt = index / (total - 1);
  const nodeColor = useTransform(progress, [Math.max(0, activeAt - 0.03), activeAt], ['#8E9096', '#1FDCD2']);
  const nodeGlow = useTransform(
    progress,
    [Math.max(0, activeAt - 0.03), activeAt],
    ['0 0 0px rgba(31,220,210,0)', '0 0 10px rgba(31,220,210,0.8)']
  );

  return (
    <div className="relative grid gap-6 md:grid-cols-2">
      <motion.div
        className="absolute left-0 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full md:left-1/2"
        style={{ backgroundColor: nodeColor, boxShadow: nodeGlow }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`pl-8 md:pl-0 ${isRight ? 'md:col-start-2 md:pl-16' : 'md:col-start-1 md:pr-16 md:text-right'}`}
      >
        <div className="text-[13px] uppercase tracking-[0.12em] text-[#1FDCD2]">{milestone.date}</div>
        <div className="mt-2 font-garamond text-[24px] font-semibold text-[#F5F5F7]">{milestone.title}</div>
        <div className="mt-1 text-[14px] text-[#8E9096]">{milestone.org}</div>
        <p className={`mt-3 max-w-[380px] text-[14px] leading-relaxed text-[#B8BABE] ${isRight ? '' : 'md:ml-auto'}`}>
          {milestone.desc}
        </p>
      </motion.div>
    </div>
  );
}