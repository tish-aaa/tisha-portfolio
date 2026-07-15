export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col justify-center px-[6vw]">
      <div className="mb-[18px] w-fit rounded-full border border-teal-darkest px-4 py-1.5 text-[11px] uppercase tracking-[0.15em] text-teal-darkest">
        Full stack developer · front-end
      </div>

      <h1 className="max-w-[900px] font-garamond text-[clamp(44px,7vw,96px)] font-semibold leading-[1.05] text-cream">
        Hi, I&apos;m Tisha —<br />
        I build{' '}
        <span className="text-cyan-light drop-shadow-[0_0_40px_rgba(34,225,223,0.45)]">
          things
        </span>
        <br />
        that work.
      </h1>

      <p className="mt-6 max-w-[560px] text-base leading-relaxed text-muted">
        Front-end focused full stack developer currently expanding into data.
        This is where the code, the curiosity, and the trajectory live.
      </p>

      <div className="mt-11 flex gap-4">
        <a
          href="#projects"
          className="rounded-full bg-cyan px-7 py-3.5 font-garamond text-[15px] font-medium text-midnight transition-all hover:bg-cyan-light hover:shadow-[0_0_30px_rgba(34,225,223,0.5)]"
        >
          View my work
        </a>
        <div className="contact-box flex flex-row gap-4">
          <a
            href="mailto:hello@tishasharma.in"
            className="rounded-full border border-teal-dark px-7 py-3.5 font-garamond text-[15px] font-medium text-cream transition-colors hover:border-cyan"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-[6vw] flex items-center gap-2.5 text-[11px] uppercase tracking-[0.1em] text-teal">
        Scroll the globe
        <span className="inline-block h-px w-6 animate-pulse bg-teal" />
      </div>
    </section>
  );
}
