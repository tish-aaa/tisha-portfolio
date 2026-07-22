const links = [
  { label: 'Email', value: 'hello@tishasharma.in', href: 'mailto:hello@tishasharma.in' },
  { label: 'GitHub', value: 'tish-aaa', href: 'https://github.com/tish-aaa' },
  { label: 'LinkedIn', value: 'tishaaa', href: 'https://www.linkedin.com/in/tishaaa' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-[6vw] py-32 text-center">
      <div className="mb-4 text-[11px] uppercase tracking-[0.15em] text-[#8E9096]">
        Contact
      </div>
      <h2 className="mx-auto max-w-[600px] font-garamond text-[clamp(32px,5vw,60px)] font-semibold leading-[1.1] text-[#F5F5F7]">
        Have a project in mind?
      </h2>

      <a
        href="mailto:hello@tishasharma.in"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1FDCD2] px-8 py-4 font-garamond text-[17px] font-medium text-[#0B0C0F] transition-all hover:bg-[#22E1DF] hover:shadow-[0_0_30px_rgba(31,220,210,0.45)]"
      >
        Let&apos;s talk →
      </a>

      <div className="mx-auto mt-16 flex max-w-[760px] flex-col gap-3 sm:flex-row">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group flex-1 rounded-2xl border border-[#8E9096]/25 px-5 py-4 text-left transition-all hover:border-[#1FDCD2]/50 hover:bg-[#8E9096]/5"
          >
            <div className="text-[11px] uppercase tracking-[0.1em] text-[#8E9096]">
              {link.label}
            </div>
            <div className="mt-1 font-garamond text-[16px] text-[#F5F5F7] transition-colors group-hover:text-[#1FDCD2]">
              {link.value}
            </div>
          </a>
        ))}
      </div>

      <div className="mt-14 text-[13px] text-[#8E9096]">Thane, Maharashtra, India</div>
    </section>
  );
}