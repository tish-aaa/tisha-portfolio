'use client';

import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type Project = {
  slug: string;
  title: string;
  tags: string[];
  blurb: string;
  gradient: string;
  icon: string;
};

// Placeholder gradients/icons stand in for real screenshots. Swap the
// `image` field in here for a real screenshot path once you have one —
// nothing else about this component needs to change.
const projects: Project[] = [
  {
    slug: 'site-scraper',
    title: 'Image Scraper Pipeline',
    tags: ['Python', 'Playwright', 'PHP', 'DOMXPath'],
    blurb: 'Dual-language scraper pulling listing images off classifieds sites in stealth mode.',
    gradient: 'linear-gradient(135deg, #1FDCD2 0%, #0B0C0F 70%)',
    icon: '⌁',
  },
  {
    slug: 'outfit-maven',
    title: 'Outfit Maven',
    tags: ['Flutter', 'Dart', 'PHP', 'MySQL', 'MongoDB', 'Razorpay'],
    blurb: 'Solo-built fashion social-commerce app — research-driven, full-stack, 90% complete.',
    gradient: 'linear-gradient(135deg, #8E9096 0%, #0B0C0F 70%)',
    icon: '✂',
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState<Project | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  return (
    <section
      id="projects"
      className="relative z-10 px-[6vw] py-32"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      <div className="mb-16">
        <div className="mb-5 text-[11px] uppercase tracking-[0.15em] text-[#8E9096]">
          Projects
        </div>
        <h2 className="max-w-[600px] font-garamond text-[clamp(32px,4vw,52px)] font-semibold leading-[1.15] text-[#F5F5F7]">
          A few things I&apos;ve built.
        </h2>
      </div>

      <div className="border-t border-[#8E9096]/20">
        {projects.map((project) => (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            onMouseEnter={() => setHovered(project)}
            onMouseLeave={() => setHovered(null)}
            className="group flex items-center justify-between border-b border-[#8E9096]/20 py-8 transition-colors hover:bg-[#8E9096]/5"
          >
            <div>
              <div className="font-garamond text-[32px] font-semibold text-[#F5F5F7] transition-colors group-hover:text-[#1FDCD2] sm:text-[44px]">
                {project.title}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[12px] uppercase tracking-[0.08em] text-[#8E9096]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="hidden text-[#8E9096] transition-colors group-hover:text-[#1FDCD2] sm:block">
              View →
            </span>
            </a>
        ))}
      </div>

      {/* cursor-follow preview — desktop only, hidden on touch since
          there's no persistent cursor to follow */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-64 w-48 overflow-hidden rounded-xl md:block"
        style={{
          x: springX,
          y: springY,
          translateX: '20px',
          translateY: '-50%',
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.9,
          transition: 'opacity 0.25s ease, scale 0.25s ease',
        }}
      >
        {hovered && (
          <div
            className="flex h-full w-full flex-col justify-end p-4"
            style={{ background: hovered.gradient }}
          >
            <span className="mb-2 text-3xl">{hovered.icon}</span>
            <p className="text-[13px] leading-snug text-[#F5F5F7]">{hovered.blurb}</p>
          </div>
        )}
      </motion.div>
    </section>
  );
}