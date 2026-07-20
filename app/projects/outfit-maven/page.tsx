export default function OutfitMavenPage() {
  return (
    <main className="min-h-screen bg-[#0B0C0F] px-[6vw] py-24 text-[#F5F5F7]">
      <a href="/#projects" className="text-[13px] text-[#8E9096] transition-colors hover:text-[#1FDCD2]">
        ← Back home
      </a>

      <div className="mt-10 max-w-[720px]">
        <div className="mb-4 text-[11px] uppercase tracking-[0.15em] text-[#8E9096]">
          Solo project — final year, ~90% complete
        </div>
        <h1 className="font-garamond text-[clamp(36px,5vw,60px)] font-semibold leading-[1.1]">
          Outfit Maven
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[#B8BABE]">
          A Flutter-based fashion social-commerce app merging outfit
          inspiration, social interaction, and e-commerce — designed to
          solve outfit-planning fatigue and the cost of buying looks worn
          once, for occasions like weddings.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {['Flutter', 'Dart', 'PHP', 'MySQL', 'MongoDB', 'Razorpay'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#8E9096]/40 px-3.5 py-1.5 text-[12px] text-[#B8BABE]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Research */}
      <section className="mt-24 max-w-[720px]">
        <h2 className="font-garamond text-[26px] font-semibold text-[#1FDCD2]">
          Started with research, not code
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[#B8BABE]">
          Before writing a line of Flutter, I ran a survey to validate the
          idea and prioritize features — rather than assume what people
          wanted.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[#8E9096]/20 pt-8">
          <Stat value="88.9%" label="face outfit-planning challenges" />
          <Stat value="66.7%" label="cite budget as the top pain point" />
          <Stat value="88.9%" label="rated Recommendations + Inspo as must-have" />
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-[#B8BABE]">
          That data directly shaped scope — I explicitly cut AR try-on and
          seller-account features after respondents showed low interest,
          rather than building them speculatively.
        </p>
      </section>

      {/* Competitive analysis */}
      <section className="mt-20 max-w-[720px]">
        <h2 className="font-garamond text-[26px] font-semibold text-[#1FDCD2]">
          Where existing apps fell short
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[#B8BABE]">
          I benchmarked StyleBook, Whering, and Poshmark before designing
          the feature set. None combined inspiration browsing, buying, and
          social feedback in one place — and none supported posting
          anonymously, which mattered for people wanting styling advice
          without exposing their identity.
        </p>
      </section>

      {/* Features */}
      <section className="mt-20 max-w-[720px]">
        <h2 className="font-garamond text-[26px] font-semibold text-[#1FDCD2]">
          What it does
        </h2>
        <ul className="mt-6 space-y-4">
          {[
            'Social outfit feed — post, like, comment, browse anonymously or publicly',
            'Quiz-based recommendation engine — mood, occasion, weather, and accessories quizzes generate personalized outfit suggestions',
            'Full commerce flow — cart, address management, checkout, Razorpay payment, order history',
            'Complete post management — add, edit, delete, toggle private/public, mark items for sale with pricing',
          ].map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-[#B8BABE]">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1FDCD2]" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Build */}
      <section className="mt-20 max-w-[720px] pb-24">
        <h2 className="font-garamond text-[26px] font-semibold text-[#1FDCD2]">
          How it&apos;s built
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[#B8BABE]">
          A 3-tier architecture — Flutter/Dart on the front end, PHP on the
          back end, MySQL and MongoDB for data — built solo using Agile/
          Scrum with incremental delivery. The full system was designed
          before implementation: ER and schema diagrams, context and
          leveled DFDs, use case, sequence, and activity diagrams, and
          hand-drawn wireframes.
        </p>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-garamond text-[32px] font-semibold text-[#F5F5F7]">{value}</div>
      <div className="mt-1 text-[13px] leading-snug text-[#8E9096]">{label}</div>
    </div>
  );
}