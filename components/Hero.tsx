export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-center px-[6vw]">
      <div className="mb-[18px] flex w-fit items-center gap-2 rounded-full border border-[#8E9096] px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] text-[#D8D9DE]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1FDCD2] shadow-[0_0_8px_rgba(31,220,210,0.8)]" />
        Full stack developer · front-end
      </div>

      <h1 className="max-w-[900px] animate-shine bg-[linear-gradient(110deg,#D8D9DE_35%,#FFFFFF_45%,#D8D9DE_55%)] bg-[length:250%_100%] bg-clip-text font-garamond text-[clamp(44px,7vw,96px)] font-semibold leading-[1.05] text-transparent">
        Hi, I&apos;m Tisha —<br />
        I build{' '}
        <span className="bg-none text-[#1FDCD2] drop-shadow-[0_0_28px_rgba(31,220,210,0.5)]">
          things
        </span>
        <br />
        that work.
      </h1>

      <p className="mt-6 max-w-[560px] text-base leading-relaxed text-[#B8BABE]">
        Front-end focused full stack developer currently expanding into data.
        This is where the code, the curiosity, and the trajectory live.
      </p>

      <div className="mt-11 flex gap-4">
        <a
          href="#projects"
          className="rounded-full bg-[#F5F5F7] px-7 py-3.5 font-garamond text-[15px] font-medium text-[#0B0C0F] transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(245,245,247,0.4)]"
        >
          View my work
        </a>
        <div className="contact-box flex flex-row gap-4">
          <a
            href="mailto:hello@tishasharma.in"
            className="rounded-full border border-[#8E9096] px-7 py-3.5 font-garamond text-[15px] font-medium text-[#F5F5F7] transition-colors hover:border-[#1FDCD2] hover:text-[#1FDCD2]"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-[6vw] flex items-center gap-2.5 text-[11px] uppercase tracking-[0.1em] text-[#8E9096]">
        Scroll the globe
        <span className="inline-block h-px w-6 animate-pulse bg-[#8E9096]" />
      </div>
    </section>
  );
}
