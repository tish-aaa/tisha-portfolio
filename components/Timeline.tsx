'use client';

import { useRef } from 'react';
import { m, useScroll, useTransform, type MotionValue } from 'framer-motion';

type Milestone = {
  date: string;
  title: string;
  org: string;
  desc: string;
  // 'professional' = paid work / formal credential (amber).
  // 'leadership'   = leadership, competitions, community (cyan).
  track: 'professional' | 'leadership';
};

const milestones: Milestone[] = [
  {
    date: 'Nov 2022 – Jan 2025',
    title: 'Head, Inventrix',
    org: 'V.G. Vaze Kelkar College',
    desc: 'Led a 35-member team organizing Inventrix, an annual IT event for 100+ participants.',
    track: 'leadership',
  },
  {
    date: 'Feb 2023',
    title: '2nd Prize, Aavishkaar Research Competition',
    org: 'V.G. Vaze Kelkar College',
    desc: 'Won 2nd prize for "My PolluTrack," a concept device to track an individual vehicle\'s contribution to local air quality — selected for the district level.',
    track: 'leadership',
  },
  {
    date: 'Jul–Aug 2023',
    title: 'Web Dev Intern',
    org: 'Indobricks',
    desc: 'Researched, designed, and built websites using Wix, HTML, CSS, and Bootstrap 5.',
    track: 'professional',
  },
  {
    date: 'Jan–Apr 2024',
    title: 'Web Dev Tester & Intern',
    org: 'Variety Tech',
    desc: 'Tested Ireland-based client sites for functionality, usability, and quality alongside the dev team.',
    track: 'professional',
  },
  {
    date: 'Apr 2024 – Feb 2025',
    title: 'Web Developer',
    org: 'Variety Tech Consultants',
    desc: 'Building and maintaining websites for Ireland-based car dealerships.',
    track: 'professional',
  },
  {
    date: 'Apr 2025 — present',
    title: 'Full Stack Developer specialized in Front-end',
    org: 'Variety Tech Consultants',
    desc: 'Fixes UI and functional bugs independently and extends legacy PHP/Laravel code without breaking existing behavior. Works across a shared base-template architecture, handles pre-launch QA, and built a multi-step review-submission flow with two new modals ahead of the existing form.',
    track: 'professional',
  },
  {
    date: '2025',
    title: 'BSc IT Graduate',
    org: 'V.G. Vaze Kelkar College',
    desc: '9.1 CGPA. Convocation done, degree in hand.',
    track: 'professional',
  },
  {
    date: 'Jul 2026 — present',
    title: 'Director, Club Service',
    org: 'Rotaract Club of Thane North End',
    desc: 'Leading service projects, coordinating volunteers, and planning and budgeting initiatives. Chaired the club\'s 15th Installation Ceremony in Aug 2026, hosting 50+ attendees.',
    track: 'leadership',
  },
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
        <div className="mb-5 text-[11px] uppercase tracking-[0.15em] text-amber">
          Journey
        </div>
        <h2 className="max-w-[500px] font-garamond text-[clamp(28px,3.5vw,44px)] font-semibold leading-[1.15] text-silver-light">
          How I got here.
        </h2>
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-[900px]">
        {/* base track */}
        <div className="absolute left-[7px] top-0 h-full w-px bg-silver-dim/20 md:left-1/2 md:-translate-x-1/2" />
        {/* glowing fill that grows as you scroll through the section */}
        <m.div
          className="absolute left-[7px] top-0 w-px bg-accent shadow-[0_0_8px_rgba(31,220,210,0.6)] md:left-1/2 md:-translate-x-1/2"
          style={{ height: lineHeight }}
        />

        <div className="flex flex-col gap-16">
          {milestones.map((ms, i) => (
            <TimelineRow key={ms.title} milestone={ms} index={i} progress={scrollYProgress} total={milestones.length} />
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
  const isProfessional = milestone.track === 'professional';
  const activeColor = isProfessional ? '#F5A623' : '#1FDCD2';
  const activeGlow = isProfessional ? '245,166,35' : '31,220,210';
  const nodeColor = useTransform(progress, [Math.max(0, activeAt - 0.03), activeAt], ['#8E9096', activeColor]);
  const nodeGlow = useTransform(
    progress,
    [Math.max(0, activeAt - 0.03), activeAt],
    [`0 0 0px rgba(${activeGlow},0)`, `0 0 10px rgba(${activeGlow},0.8)`]
  );

  return (
    <div className="relative grid gap-6 md:grid-cols-2">
      <m.div
        className="absolute left-[7px] top-1.5 h-3.5 w-3.5 -translate-x-1/2 rounded-full md:left-1/2"
        style={{ backgroundColor: nodeColor, boxShadow: nodeGlow }}
      />

      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`pl-8 md:pl-0 ${isRight ? 'md:col-start-2 md:pl-16' : 'md:col-start-1 md:pr-16 md:text-right'}`}
      >
        <div className={`text-[13px] uppercase tracking-[0.12em] ${isProfessional ? 'text-amber' : 'text-accent'}`}>
          {milestone.date}
        </div>
        <div className="mt-2 font-garamond text-[24px] font-semibold text-silver-light">{milestone.title}</div>
        {milestone.org && <div className="mt-1 text-[14px] text-silver-dim">{milestone.org}</div>}
        <p className={`mt-3 max-w-[380px] text-[14px] leading-relaxed text-silver-body ${isRight ? '' : 'md:ml-auto'}`}>
          {milestone.desc}
        </p>
      </m.div>
    </div>
  );
}