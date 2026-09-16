'use client';

import { useState } from 'react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile/tablet bar — below 992px, unchanged from the original design */}
      <nav className="fixed inset-x-0 top-0 z-50 w-full bg-obsidian/80 backdrop-blur-[5px] min-[992px]:hidden">
        <div className="flex flex-wrap items-center justify-between gap-y-0 px-[6vw] py-4">
          <a href="#top" className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 28 28" style={{ animation: 'spin-slow 12s linear infinite' }}>
              <path
                d="M14 2 L16.2 11.8 L26 14 L16.2 16.2 L14 26 L11.8 16.2 L2 14 L11.8 11.8 Z"
                className="fill-accent"
                style={{ filter: 'drop-shadow(0 0 3px rgba(31,220,210,0.7))' }}
              />
            </svg>
            <span className="font-garamond text-[16px] text-silver-light">Tisha Sharma</span>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="z-50 flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`h-px w-6 bg-silver-light transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-silver-light transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Desktop — 992px and up — a compact, self-sized floating pill,
          centered on the page, name above the link row */}
      <nav className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 min-[992px]:block">
        <div className="flex flex-col items-center gap-1 rounded-3xl bg-obsidian/60 px-8 py-2 backdrop-blur-[8px]">
          <a href="#top" className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 28 28" style={{ animation: 'spin-slow 12s linear infinite' }}>
              <path
                d="M14 2 L16.2 11.8 L26 14 L16.2 16.2 L14 26 L11.8 16.2 L2 14 L11.8 11.8 Z"
                className="fill-accent"
                style={{ filter: 'drop-shadow(0 0 3px rgba(31,220,210,0.7))' }}
              />
            </svg>
            <span className="font-garamond text-[16px] text-silver-light">Tisha Sharma</span>
          </a>

          <div className="flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] uppercase tracking-[0.08em] text-silver-dim transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full border border-silver-dim/40 px-5 py-2 text-[13px] text-silver-light transition-colors hover:border-accent hover:text-accent"
            >
              Say hi
            </a>
          </div>
        </div>
      </nav>

      {/* full-screen mobile/tablet menu overlay, always mounted so the
          opacity + transform transition can actually animate instead of
          just popping in and out */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-obsidian/88 backdrop-blur-md transition-all duration-300 min-[992px]:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="mt-24 flex flex-col px-[6vw]">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-silver-dim/15 py-5 transition-all duration-300"
              style={{
                transitionDelay: open ? `${i * 60}ms` : '0ms',
                opacity: open ? 1 : 0,
                transform: open ? 'translateX(0)' : 'translateX(16px)',
              }}
            >
              <span className="font-mono text-[12px] text-accent">
                0{i + 1}
              </span>
              <span className="font-garamond text-[26px] text-silver-light transition-colors group-hover:text-accent">
                {l.label}
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center justify-between px-[6vw] pb-10 text-[12px] uppercase tracking-[0.1em] text-silver-dim">
          <span>Thane, India</span>
          <a href="#contact" onClick={() => setOpen(false)} className="text-accent">
            Say hi →
          </a>
        </div>
      </div>
    </>
  );
}