'use client';

import { useState } from 'react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const fadeMask = {
  WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 99.9%)',
  maskImage: 'linear-gradient(to left, black 60%, transparent 99.9%)',
};

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 right-0 z-50 w-full bg-transparent backdrop-blur-[5px] md:w-[62%]"
      style={fadeMask}
    >
      <div className="flex flex-wrap gap-y-0 items-center justify-between px-[6vw] py-4 md:px-[4vw]">
        <a href="#top" className="flex items-center gap-2.5">
          <svg width="18" height="18" viewBox="0 0 28 28" style={{ animation: 'spin-slow 12s linear infinite' }}>
            <path
              d="M14 2 L16.2 11.8 L26 14 L16.2 16.2 L14 26 L11.8 16.2 L2 14 L11.8 11.8 Z"
              className="fill-[#1FDCD2]"
              style={{ filter: 'drop-shadow(0 0 3px rgba(31,220,210,0.7))' }}
            />
          </svg>
          <span className="font-garamond text-[16px] text-[#F5F5F7]">Tisha Sharma</span>
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] uppercase tracking-[0.08em] text-[#8E9096] transition-colors hover:text-[#1FDCD2]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-[#8E9096]/40 px-5 py-2 text-[13px] text-[#F5F5F7] transition-colors hover:border-[#1FDCD2] hover:text-[#1FDCD2]"
          >
            Say hi
          </a>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-px w-6 bg-[#F5F5F7] transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-[#F5F5F7] transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div
          className="flex flex-col gap-1 border-t border-[#8E9096]/10 bg-[#0B0C0F]/90 px-[6vw] py-4 backdrop-blur-md md:hidden"
          style={{ WebkitMaskImage: 'none', maskImage: 'none' }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 font-garamond text-[20px] text-[#F5F5F7] transition-colors hover:text-[#1FDCD2]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}