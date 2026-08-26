'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

type SkillGroup = {
  label: string;
  icon: string;
  center: [number, number];
  skills: string[];
  color?: 'accent' | 'amber';
};

// Each group has exactly 4 skills, arranged top/right/bottom/left around
// its center point — that's what this offsets array is for.
const NODE_OFFSETS: [number, number][] = [
  [0, -85],
  [85, 0],
  [0, 85],
  [-85, 0],
];

// Desktop: clusters zig-zag left-to-right across a wide viewBox.
const desktopGroups: SkillGroup[] = [
  { label: 'Core', icon: '✦', center: [170, 330], skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 5'] },
  { label: 'Frameworks', icon: '◆', center: [470, 150], skills: ['jQuery', 'Laravel', 'Next.js', 'React'] },
  { label: 'Back-end & Data', icon: '●', center: [790, 330], skills: ['PHP', 'SQL', 'Python', 'Networking'], color: 'amber' },
  { label: 'Tools', icon: '▲', center: [1080, 150], skills: ['Git', 'VS Code', 'Power BI', 'Excel'] },
];

// Mobile: same clusters, same skills, just stacked vertically in a
// portrait viewBox instead of spread horizontally — same visual language,
// laid out for a narrow screen instead of being a squished copy of it.
const mobileGroups: SkillGroup[] = [
  { label: 'Core', icon: '✦', center: [200, 160], skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 5'] },
  { label: 'Frameworks', icon: '◆', center: [200, 540], skills: ['jQuery', 'Laravel', 'Next.js', 'React'] },
  { label: 'Back-end & Data', icon: '●', center: [200, 920], skills: ['PHP', 'SQL', 'Python', 'Networking'], color: 'amber' },
  { label: 'Tools', icon: '▲', center: [200, 1300], skills: ['Git', 'VS Code', 'Power BI', 'Excel'] },
];

// Tablet (768–1199px): a 2×2 grid instead of either the wide zig-zag
// (too cramped at this width) or the tall vertical stack (wastes the
// extra horizontal room an iPad actually has).
const tabletGroups: SkillGroup[] = [
  { label: 'Core', icon: '✦', center: [220, 220], skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 5'] },
  { label: 'Frameworks', icon: '◆', center: [620, 220], skills: ['jQuery', 'Laravel', 'Next.js', 'React'] },
  { label: 'Back-end & Data', icon: '●', center: [220, 680], skills: ['PHP', 'SQL', 'Python', 'Networking'], color: 'amber' },
  { label: 'Tools', icon: '▲', center: [620, 680], skills: ['Git', 'VS Code', 'Power BI', 'Excel'] },
];

// Text halo — a dark stroke drawn behind each label so it stays readable
// against the busy starfield behind it, regardless of what's back there.
const textHalo: CSSProperties = {
  paintOrder: 'stroke',
  stroke: '#0B0C0F',
  strokeWidth: 5,
  strokeLinejoin: 'round',
};

function ConstellationSVG({
  groups,
  viewBox,
  visible,
  className,
  glowId,
  labelSize = 13,
  skillSize = 18,
}: {
  groups: SkillGroup[];
  viewBox: string;
  visible: boolean;
  className: string;
  glowId: string;
  labelSize?: number;
  skillSize?: number;
}) {
  let nodeIndex = 0;

  return (
    <svg viewBox={viewBox} className={className}>
      <defs>
        <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <polyline
        points={groups.map((g) => g.center.join(',')).join(' ')}
        fill="none"
        stroke="#8E9096"
        strokeOpacity={0.15}
        strokeWidth={1}
      />

      {groups.map((group) => (
        <g key={group.label}>
          <text
            x={group.center[0]}
            y={group.center[1] - 118}
            textAnchor="middle"
            className={`${group.color === 'amber' ? 'fill-amber' : 'fill-accent'} uppercase tracking-[0.1em]`}
            style={{ ...textHalo, fontSize: labelSize, opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}
          >
            {group.icon} {group.label}
          </text>

          {group.skills.map((skill, i) => {
            const [dx, dy] = NODE_OFFSETS[i];
            const x = group.center[0] + dx;
            const y = group.center[1] + dy;
            const delay = nodeIndex * 90;
            nodeIndex += 1;
            const twinkleDelay = (nodeIndex * 0.37) % 3;

            return (
              <g
                key={skill}
                className="group cursor-default"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.85)',
                  transformOrigin: `${x}px ${y}px`,
                  transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
                }}
              >
                <line
                  x1={group.center[0]}
                  y1={group.center[1]}
                  x2={x}
                  y2={y}
                  stroke={group.color === 'amber' ? '#F5A623' : '#8E9096'}
                  strokeOpacity={group.color === 'amber' ? 0.35 : 0.3}
                  strokeWidth={1}
                  className={`transition-all duration-300 group-hover:stroke-opacity-80 ${group.color === 'amber' ? 'group-hover:stroke-amber' : 'group-hover:stroke-accent'}`}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={4.5}
                  filter={`url(#${glowId})`}
                  className={`transition-all duration-300 ${group.color === 'amber' ? 'fill-amber group-hover:fill-amber' : 'fill-[#D8D9DE] group-hover:fill-accent'}`}
                  style={{ animation: `twinkle 3.2s ease-in-out ${twinkleDelay}s infinite` }}
                />
                <text
                  x={x}
                  y={y - 16}
                  textAnchor="middle"
                  className="fill-[#B8BABE] font-garamond transition-all duration-300 group-hover:fill-[#F5F5F7]"
                  style={{ ...textHalo, fontSize: skillSize }}
                >
                  {skill}
                </text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative z-10 px-[6vw] py-32">
      <div className="mb-14">
        <div className="mb-5 text-[11px] uppercase tracking-[0.15em] text-[#8E9096]">
          Skills
        </div>
        <h2 className="max-w-[600px] font-garamond text-[clamp(32px,4vw,52px)] font-semibold leading-[1.15] text-[#F5F5F7]">
          Comfortable across the stack.
        </h2>
      </div>

      {/* Mobile (below 768px): vertical stack, larger text since
          there's no crowding to worry about in a single column */}
      <ConstellationSVG
        groups={mobileGroups}
        viewBox="0 0 400 1450"
        visible={visible}
        className="w-full md:hidden"
        glowId="glow-mobile"
        labelSize={15}
        skillSize={21}
      />

      {/* Tablet (768–1199px): 2×2 grid */}
      <ConstellationSVG
        groups={tabletGroups}
        viewBox="0 0 840 900"
        visible={visible}
        className="hidden w-full md:block min-[1200px]:hidden"
        glowId="glow-tablet"
      />

      {/* Desktop (1200px+): wide zig-zag */}
      <ConstellationSVG
        groups={desktopGroups}
        viewBox="0 0 1200 480"
        visible={visible}
        className="hidden w-full min-[1200px]:block"
        glowId="glow-desktop"
      />
    </section>
  );
}