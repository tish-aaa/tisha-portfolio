export default function SiteScraperPage() {
  return (
    <main className="min-h-screen bg-obsidian px-[6vw] py-24 text-silver-light">
      <a href="/#projects" className="text-[13px] text-silver-dim transition-colors hover:text-accent">
        ← Back home
      </a>

      <div className="mt-10 max-w-[720px]">
        <div className="mb-4 text-[11px] uppercase tracking-[0.15em] text-silver-dim">
          Two scrapers, two rendering models
        </div>
        <h1 className="font-garamond text-[clamp(36px,5vw,60px)] font-semibold leading-[1.1]">
          Image Scraper Pipeline
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-silver-body">
          A pair of standalone scrapers for pulling listing images off
          websites — one built for JavaScript-rendered, scroll-loaded
          content, and one for simpler server-rendered pages. The split
          exists because those two cases need fundamentally different
          tools, not because one approach is better than the other.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {['Python', 'Playwright', 'playwright-stealth', 'PHP', 'DOMXPath'].map((tag, i) => (
            <span
              key={tag}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] ${
                i % 2 === 0
                  ? 'border-accent/40 text-accent'
                  : 'border-amber/40 text-amber'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Why two approaches */}
      <section className="mt-24 max-w-[720px]">
        <h2 className="font-garamond text-[26px] font-semibold text-accent">
          Why two languages, not one
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-silver-body">
          The two scripts aren&apos;t redundant — they solve different
          problems. Some sites render their product grids client-side with
          JavaScript, loading more items as you scroll; the raw HTML the
          server sends back is nearly empty until a browser executes that
          JS. Other sites render everything server-side, so the content is
          already sitting in the first HTML response. Trying to use one
          tool for both cases means either dragging a full browser into
          jobs that don&apos;t need one, or hitting a wall on sites a
          lightweight parser can&apos;t see into.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-silver-body">
          So the pipeline picks the lighter tool when the target allows it,
          and reaches for a real browser only when the content demands it.
        </p>
      </section>

      {/* scraper.py */}
      <section className="mt-20 max-w-[720px]">
        <h2 className="font-garamond text-[26px] font-semibold text-accent">
          scraper.py — for JS-rendered sites
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-silver-body">
          Automates a real Chromium browser through Playwright to scroll a
          JavaScript-rendered product grid and download images as they
          load in.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            'Launches a stealth-configured Chromium session (playwright-stealth) to reduce automation fingerprinting',
            'Scrolls to the bottom repeatedly, waiting for new content, until page height stops changing or a scroll limit is hit',
            'Extracts product images and names directly from the loaded grid',
            'Downloads with a configurable cap (MAX_DOWNLOADS) so it never runs indefinitely',
            'Skips and logs any image that fails to download, rather than crashing the whole run',
          ].map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-silver-body">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl border border-silver-dim/20 bg-[#12141a] px-5 py-4">
          <code className="font-mono text-[13px] text-silver">python scraper.py</code>
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-silver-dim">
          Configure <code className="font-mono text-silver-body">BASE_URL</code>,{' '}
          <code className="font-mono text-silver-body">TARGET_PATH</code>,{' '}
          <code className="font-mono text-silver-body">PRODUCT_SELECTOR</code>,{' '}
          <code className="font-mono text-silver-body">MAX_SCROLLS</code>, and{' '}
          <code className="font-mono text-silver-body">MAX_DOWNLOADS</code> at the
          top of the file.
        </p>
      </section>

      {/* bot.php */}
      <section className="mt-20 max-w-[720px]">
        <h2 className="font-garamond text-[26px] font-semibold text-accent">
          bot.php — for server-rendered sites
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-silver-body">
          A no-browser alternative using PHP&apos;s native HTTP context and
          DOMXPath, for sites that serve their content directly in the
          initial HTML response — no rendering step needed.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            'Fetches a search results page with spoofed headers (User-Agent, Referer) to mimic a normal browser request',
            'Parses result links via XPath and visits up to a configurable number of listings',
            'Extracts carousel images per listing via XPath and saves them locally',
            'Logs every step with timestamps to activity.log',
          ].map((item) => (
            <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-silver-body">
              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl border border-silver-dim/20 bg-[#12141a] px-5 py-4">
          <code className="font-mono text-[13px] text-silver">php bot.php &quot;search term&quot;</code>
        </div>
      </section>

      {/* Engineering judgment / limitations */}
      <section className="mt-20 max-w-[720px] pb-24">
        <h2 className="font-garamond text-[26px] font-semibold text-accent">
          Where each one breaks
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-silver-body">
          Neither script is built to be a general-purpose scraper, and I
          don&apos;t think that&apos;s a flaw — it&apos;s a scope decision.
          Both are tied to the HTML structure of whatever site they were
          written against: pointing either one at a new target means
          inspecting that site&apos;s actual markup and rewriting the
          selectors. That brittleness is inherent to scraping, not a bug to
          fix.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-silver-body">
          <code className="font-mono text-[13px] text-silver-body">bot.php</code>&apos;s
          limit is sharper: it cannot render JavaScript at all. I confirmed
          this directly — pointing it at a JS-heavy classifieds site
          returned nothing, because the script only ever sees the raw
          server response, and the content it needed hadn&apos;t rendered
          yet. That failure is exactly why{' '}
          <code className="font-mono text-[13px] text-silver-body">scraper.py</code>{' '}
          exists as a separate tool rather than a planned future upgrade to
          the PHP version.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-silver-body">
          A few other honest limitations: neither script retries a failed
          fetch, it just logs and moves on. Duplicate product names on the
          demo site overwrite each other on disk — a production version
          would need unique filenames. And{' '}
          <code className="font-mono text-[13px] text-silver-body">
            playwright-stealth
          </code>{' '}
          only defeats basic fingerprint checks; it won&apos;t get past
          enterprise anti-bot systems like Cloudflare Turnstile or DataDome.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-silver-body">
          Both scripts were built and tested with rate-limiting and delay
          logic, to run responsibly rather than hammer a target site — and
          both assume you&apos;ve checked that site&apos;s{' '}
          <code className="font-mono text-[13px] text-silver-body">robots.txt</code>{' '}
          and terms of service first.
        </p>
      </section>
    </main>
  );
}
