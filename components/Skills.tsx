'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

type SkillGroup = {
  label: string;
  icon: string;
  center: [number, number];
  skills: string[];
};

// Each group has exactly 4 skills, arranged top/right/bottom/left around
// its center point — that's what this offsets array is for.
const NODE_OFFSETS: [number, number][] = [
  [0, -85],
  [85, 0],
  [0, 85],
  [-85, 0],
];

// y-centers alternate 150 / 330 so clusters zig-zag — both values keep
// every node + label safely inside the 0–480 viewBox with margin to spare.
const skillGroups: SkillGroup[] = [
  { label: 'Core', icon: '✦', center: [170, 330], skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 5'] },
  { label: 'Frameworks', icon: '◆', center: [470, 150], skills: ['jQuery', 'Laravel', 'Next.js', 'React'] },
  { label: 'Back-end & Data', icon: '●', center: [790, 330], skills: ['PHP', 'SQL', 'Python', 'Networking'] },
  { label: 'Tools', icon: '▲', center: [1080, 150], skills: ['Git', 'VS Code', 'Power BI', 'Excel'] },
];

// Text halo — a dark stroke drawn behind each label so it stays readable
// against the busy starfield behind it, regardless of what's back there.
const textHalo: CSSProperties = {
  paintOrder: 'stroke',
  stroke: '#0B0C0F',
  strokeWidth: 5,
  strokeLinejoin: 'round',
};

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

  let nodeIndex = 0;

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

      {/* Mobile: simple grouped list — the constellation's wide layout
          doesn't translate to a narrow screen, so this is a deliberate
          different view rather than a squished version of the same thing. */}
      <div className="grid gap-10 sm:grid-cols-2 md:hidden">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <div className="mb-4 text-[13px] uppercase tracking-[0.1em] text-[#1FDCD2]">
              {group.icon} {group.label}
            </div>
            <ul className="space-y-2.5">
              {group.skills.map((skill) => (
                <li key={skill} className="font-garamond text-[19px] text-[#D8D9DE]">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Desktop/tablet: the constellation */}
      <svg viewBox="0 0 1200 480" className="hidden w-full md:block" style={{ maxHeight: '520px' }}>
        <defs>
          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <polyline
          points={skillGroups.map((g) => g.center.join(',')).join(' ')}
          fill="none"
          stroke="#8E9096"
          strokeOpacity={0.15}
          strokeWidth={1}
        />

        {skillGroups.map((group) => (
          <g key={group.label}>
            <text
              x={group.center[0]}
              y={group.center[1] - 118}
              textAnchor="middle"
              className="fill-[#1FDCD2] text-[13px] uppercase tracking-[0.1em]"
              style={{ ...textHalo, opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}
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
                    stroke="#8E9096"
                    strokeOpacity={0.3}
                    strokeWidth={1}
                    className="transition-all duration-300 group-hover:stroke-[#1FDCD2] group-hover:stroke-opacity-80"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={4.5}
                    filter="url(#glow)"
                    className="fill-[#D8D9DE] transition-all duration-300 group-hover:fill-[#1FDCD2]"
                    style={{ animation: `twinkle 3.2s ease-in-out ${twinkleDelay}s infinite` }}
                  />
                  <text
                    x={x}
                    y={y - 16}
                    textAnchor="middle"
                    className="fill-[#B8BABE] font-garamond text-[18px] transition-all duration-300 group-hover:fill-[#F5F5F7]"
                    style={textHalo}
                  >
                    {skill}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </section>
  );
}