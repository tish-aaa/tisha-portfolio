const links = [
  { label: 'Email', value: 'hello@tishasharma.in', href: 'mailto:hello@tishasharma.in' },
  { label: 'GitHub', value: 'tish-aaa', href: 'https://github.com/tish-aaa' },
  { label: 'LinkedIn', value: 'tishaaa', href: 'https://www.linkedin.com/in/tishaaa' },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 px-[6vw] py-32">
      <div className="mb-16">
        <div className="mb-5 text-[11px] uppercase tracking-[0.15em] text-[#8E9096]">
          Contact
        </div>
        <h2 className="max-w-[560px] font-garamond text-[clamp(32px,5vw,64px)] font-semibold leading-[1.1] text-[#F5F5F7]">
          Let&apos;s build something.
        </h2>
      </div>

      <div className="contact-box flex flex-col gap-1">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group flex items-baseline gap-4 border-b border-[#8E9096]/15 py-5"
          >
            <span className="w-20 flex-shrink-0 text-[12px] uppercase tracking-[0.1em] text-[#8E9096]">
              {link.label}
            </span>
            <span className="font-garamond text-[24px] text-[#F5F5F7] transition-colors group-hover:text-[#1FDCD2] sm:text-[32px]">
              {link.value}
            </span>
          </a>
        ))}
      </div>

      <div className="mt-16 text-[13px] text-[#8E9096]">
        Thane, Maharashtra, India
      </div>
    </section>
  );
}