'use client';

import { useEffect, useState } from 'react';

export default function ScreenshotCarousel({ images }: { images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const close = () => setOpenIndex(null);

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setOpenIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i));
      if (e.key === 'ArrowLeft') setOpenIndex((i) => (i !== null && i > 0 ? i - 1 : i));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openIndex, images.length]);

  if (images.length === 0) {
    return (
      <section className="mt-16 rounded-2xl border border-dashed border-[#8E9096]/30 px-6 py-8 text-center">
        <p className="text-[13px] text-[#8E9096]">
          No screenshots found. Add images to{' '}
          <code className="text-[#B8BABE]">public/projects/outfit-maven/screenshots/</code>{' '}
          — this box will replace itself with the carousel automatically.
        </p>
      </section>
    );
  }

  // Doubled so the marquee loops seamlessly — translateX(-50%) on this
  // track always lands exactly at the start of the second copy.
  const track = [...images, ...images];

  return (
    <section className="mt-16">
      {/* Plain CSS keyframes, not a Tailwind utility — so this animation
          works immediately with no config/build-cache dependency. */}
      <style>{`
        @keyframes outfitMavenMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="overflow-hidden"
      >
        <div
          className="flex w-max gap-4"
          style={{
            animation: 'outfitMavenMarquee 70s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {track.map((src, i) => {
            const realIndex = i % images.length;
            return (
              <button
                key={`${src}-${i}`}
                onClick={() => setOpenIndex(realIndex)}
                className="group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-[#8E9096]/25 bg-[#12141a] transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_24px_rgba(31,220,210,0.15)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Outfit Maven screenshot ${realIndex + 1}`}
                  className="h-[420px] w-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C0F]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 left-3 text-[11px] uppercase tracking-[0.1em] text-[#F5F5F7] opacity-0 transition-opacity duration-300 group-hover:opacity-90">
                  {String(realIndex + 1).padStart(2, '0')} · Tap to view
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0C0F]/92 backdrop-blur-md"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-6 top-6 z-10 text-[13px] uppercase tracking-[0.1em] text-[#8E9096] transition-colors hover:text-accent"
          >
            Close ✕
          </button>

          <span className="absolute left-6 top-6 z-10 text-[13px] tracking-[0.1em] text-[#8E9096]">
            {String(openIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>

          {openIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(openIndex - 1);
              }}
              className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#8E9096]/30 text-[20px] text-[#8E9096] transition-colors hover:border-accent hover:text-accent md:left-8"
              aria-label="Previous screenshot"
            >
              ‹
            </button>
          )}
          {openIndex < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenIndex(openIndex + 1);
              }}
              className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#8E9096]/30 text-[20px] text-[#8E9096] transition-colors hover:border-accent hover:text-accent md:right-8"
              aria-label="Next screenshot"
            >
              ›
            </button>
          )}

          {/* Vertically scrollable for tall portrait screenshots that
              don't fully fit within the viewport height. */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[92vw] overflow-y-auto overflow-x-hidden rounded-lg"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[openIndex]}
              alt={`Outfit Maven screenshot ${openIndex + 1}`}
              className="w-full max-w-[35vw] rounded-lg shadow-[0_0_60px_rgba(31,220,210,0.12)] sm:w-auto"
            />
          </div>

          <span className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[12px] uppercase tracking-[0.1em] text-[#8E9096]">
            Esc to close
          </span>
        </div>
      )}
    </section>
  );
}