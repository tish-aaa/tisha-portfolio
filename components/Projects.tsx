type Project = {
  slug: string;
  title: string;
  tags: string[];
  desc: string;
  titleColor: 'accent' | 'amber';
};

const projects: Project[] = [
  {
    slug: 'site-scraper',
    title: 'Image Scraper Pipeline',
    tags: ['Python', 'Playwright', 'PHP', 'DOMXPath'],
    desc: 'A dual-language scraper — Python drives a real browser in stealth mode, PHP parses static HTML directly. Built to pull listing images off classifieds sites reliably.',
    titleColor: 'amber',
  },
  {
    slug: 'outfit-maven',
    title: 'Outfit Maven',
    tags: ['Flutter', 'Dart', 'PHP', 'MySQL', 'MongoDB', 'Razorpay'],
    desc: 'Solo-built, research-driven fashion social-commerce app — feed, checkout, and a quiz engine for outfit recs. 90% complete.',
    titleColor: 'accent',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 px-[6vw] py-32">
      <div className="mb-16">
        <div className="mb-5 text-[11px] uppercase tracking-[0.15em] text-silver-dim">
          Projects
        </div>
        <h2 className="max-w-[600px] font-garamond text-[clamp(32px,4vw,52px)] font-semibold leading-[1.15] text-silver-light">
          A few things I&apos;ve built.
        </h2>
      </div>

      <div className="border-t border-silver-dim/20">
        {projects.map((project) => (
          <div key={project.slug} className="group relative border-b border-silver-dim/20">
            <a
              href={`/projects/${project.slug}`}
              className="flex items-center justify-between py-8 transition-colors hover:bg-silver-dim/5"
            >
              <div>
                <div
                  className={`font-garamond text-[32px] font-semibold transition-colors sm:text-[44px] ${
                    project.titleColor === 'amber' ? 'text-amber' : 'text-accent'
                  }`}
                >
                  {project.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[12px] uppercase tracking-[0.08em] text-silver-dim">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="hidden text-silver-dim transition-colors group-hover:text-accent sm:block">
                View →
              </span>
            </a>

            {/* speech-bubble description — appears on hover, pure CSS,
                anchored to this row rather than following the cursor */}
            <div className="pointer-events-none absolute bottom-full right-24 z-20 mb-1 w-[280px] origin-bottom-right translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:right-0">
              <div className="relative rounded-2xl border border-accent/40 bg-[#12141a] p-4 shadow-[0_0_24px_rgba(31,220,210,0.15)]">
                <p className="text-[13px] leading-relaxed text-silver-body">{project.desc}</p>
                {/* tail */}
                <div className="absolute -bottom-[7px] right-8 h-3.5 w-3.5 rotate-45 border-b border-r border-accent/40 bg-[#12141a]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}