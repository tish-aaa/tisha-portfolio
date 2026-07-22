export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[#8E9096]/15 px-[6vw] py-16">
      <a
        href="#contact"
        className="group flex items-center gap-4 font-garamond text-[clamp(28px,4vw,44px)] font-semibold text-[#F5F5F7] transition-colors hover:text-[#1FDCD2]"
      >
        Still here? Let&apos;s talk
        <span className="transition-transform duration-300 group-hover:translate-x-2">↗</span>
      </a>

      <div className="mt-14 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <div className="flex items-center gap-3">
          <StarMark />
          <div>
            <div className="font-garamond text-[15px] text-[#D8D9DE]">Tisha Sharma</div>
            <div className="text-[12px] text-[#8E9096]">
              © {year} — built with Next.js, Tailwind &amp; Three.js
            </div>
          </div>
        </div>

        <a
          href="#top"
          className="text-[12px] uppercase tracking-[0.1em] text-[#8E9096] transition-colors hover:text-[#1FDCD2]"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

function StarMark() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      style={{ animation: 'spin-slow 12s linear infinite' }}
    >
      <path
        d="M14 2 L16.2 11.8 L26 14 L16.2 16.2 L14 26 L11.8 16.2 L2 14 L11.8 11.8 Z"
        className="fill-[#1FDCD2]"
        style={{ filter: 'drop-shadow(0 0 4px rgba(31,220,210,0.7))' }}
      />
    </svg>
  );
}