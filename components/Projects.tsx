type Project = {
  slug: string;
  title: string;
  tags: string[];
  desc: string;
};

const projects: Project[] = [
  {
    slug: 'site-scraper',
    title: 'Image Scraper Pipeline',
    tags: ['Python', 'Playwright', 'PHP', 'DOMXPath'],
    desc: 'A dual-language scraper — Python drives a real browser in stealth mode, PHP parses static HTML directly. Built to pull listing images off classifieds sites reliably.',
  },
  {
    slug: 'outfit-maven',
    title: 'Outfit Maven',
    tags: ['Flutter', 'Dart', 'PHP', 'MySQL', 'MongoDB', 'Razorpay'],
    desc: 'Solo-built, research-driven fashion social-commerce app — feed, checkout, and a quiz engine for outfit recs. 90% complete.',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 px-[6vw] py-32">
      <div className="mb-16">
        <div className="mb-5 text-[11px] uppercase tracking-[0.15em] text-[#8E9096]">
          Projects
        </div>
        <h2 className="max-w-[600px] font-garamond text-[clamp(32px,4vw,52px)] font-semibold leading-[1.15] text-[#F5F5F7]">
          A few things I&apos;ve built.
        </h2>
      </div>

      <div className="border-t border-[#8E9096]/20">
        {projects.map((project) => (
          <div key={project.slug} className="group relative border-b border-[#8E9096]/20">
            <a
              href={`/projects/${project.slug}`}
              className="flex items-center justify-between py-8 transition-colors hover:bg-[#8E9096]/5"
            >
              <div>
                <div className="font-garamond text-[32px] font-semibold text-[#F5F5F7] transition-colors group-hover:text-[#1FDCD2] sm:text-[44px]">
                  {project.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[12px] uppercase tracking-[0.08em] text-[#8E9096]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="hidden text-[#8E9096] transition-colors group-hover:text-[#1FDCD2] sm:block">
                View →
              </span>
            </a>

            {/* speech-bubble description — appears on hover, pure CSS,
                anchored to this row rather than following the cursor */}
            <div className="pointer-events-none absolute right-0 -top-[90%] z-20 w-[280px] origin-top-right translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:right-12">
              <div className="relative rounded-2xl border border-[#1FDCD2]/40 bg-[#12141a] p-4 shadow-[0_0_24px_rgba(31,220,210,0.15)]">
                <p className="text-[13px] leading-relaxed text-[#B8BABE]">{project.desc}</p>
                {/* tail */}
                <div className="absolute -bottom-[7px] right-8 h-3.5 w-3.5 rotate-45 border-b border-r border-[#1FDCD2]/40 bg-[#12141a]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}