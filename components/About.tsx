export default function About() {
  return (
    <section id="about" className="relative z-10 px-[6vw] py-32">
      <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="mb-5 text-[11px] uppercase tracking-[0.15em] text-[#8E9096]">
            About
          </div>
          <h2 className="font-garamond text-[clamp(32px,4vw,52px)] font-semibold leading-[1.15] text-[#F5F5F7]">
            Front-end focused,
            <br />
            data-curious.
          </h2>
          <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-[#B8BABE]">
            I build web tools and interfaces for clients across Ireland —
            everything from car configurators to lead-gen forms — with an
            eye for detail that comes from testing before I ever wrote code.
            Lately I&apos;m pointing that same curiosity at data: SQL,
            analytics, and the systems behind the interfaces I&apos;ve spent
            two years polishing.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {['Badminton', 'Travel', 'Fashion', 'Coffee', 'Naruto'].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#8E9096]/50 px-3.5 py-1.5 text-[12px] text-[#B8BABE]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#8E9096]/25 bg-[#8E9096]/10 sm:grid-cols-2">
          <FactCard label="Currently" value="Full Stack Developer specialized in Front-end" sub="Variety Tech Consultants · 2024–present" />
          <FactCard label="Education" value="BSc IT" sub="V.G. Vaze Kelkar, University of Mumbai" />
          <FactCard label="CGPA" value="9.1" sub="Across three years" />
          <FactCard label="Certified in" value="Data Analytics" sub="Power BI · Python · Advanced Excel" />
          <FactCard
            label="Currently exploring"
            value="India Data Center Transparency Tracker"
            sub="A crowdsourced platform tracking data center construction against drought/groundwater risk — research phase"
          />
          {/* <FactCard
            label="Approach"
            value="Crowdsourced + manually verified"
            sub="Cross-referencing CGWB / India-WRIS drought data with PARIVESH clearances, state approvals, and news tracking"
          /> */}
          <FactCard
            label="Community"
            value="BOD, Club Service — Rotaract"
            sub="Rotaract Club of Thane North End — leading service projects, coordinating volunteers, and planning + budgeting initiatives"
            // span
          />
        </div>
      </div>
    </section>
  );
}

function FactCard({
  label,
  value,
  sub,
  span,
}: {
  label: string;
  value: string;
  sub: string;
  span?: boolean;
}) {
  return (
    <div className={`bg-[#0B0C0F] p-6 transition-colors hover:bg-[#0F1013] ${span ? 'sm:col-span-2' : ''}`}>
      <div className="text-[11px] uppercase tracking-[0.12em] text-[#1FDCD2]">{label}</div>
      <div className="mt-2 font-garamond text-[19px] font-medium text-[#F5F5F7]">{value}</div>
      <div className="mt-1 text-[13px] text-[#8E9096]">{sub}</div>
    </div>
  );
}