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
      <nav
        className="fixed top-0 right-0 z-50 w-full bg-[#0B0C0F]/80 backdrop-blur-[5px] min-[992px]:w-[62%] min-[992px]:bg-transparent min-[992px]:[mask-image:linear-gradient(to_left,black_60%,transparent_99.9%)] min-[992px]:[-webkit-mask-image:linear-gradient(to_left,black_60%,transparent_99.9%)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-y-0 px-[6vw] py-4 min-[992px]:px-[4vw]">
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

          {/* desktop links — visible from 992px up */}
          <div className="hidden items-center gap-6 min-[992px]:flex">
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

          {/* hamburger — visible below 992px */}
          <button
            onClick={() => setOpen(!open)}
            className="z-50 flex flex-col gap-1.5 min-[992px]:hidden"
            aria-label="Toggle menu"
          >
            <span className={`h-px w-6 bg-[#F5F5F7] transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-[#F5F5F7] transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* full-screen mobile/tablet menu overlay, always mounted so the
          opacity + transform transition can actually animate instead of
          just popping in and out */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[#0B0C0F]/95 backdrop-blur-lg transition-all duration-300 min-[992px]:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-garamond text-[28px] text-[#F5F5F7] transition-all duration-300 hover:text-[#1FDCD2]"
            style={{
              transitionDelay: open ? `${i * 60}ms` : '0ms',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(12px)',
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}