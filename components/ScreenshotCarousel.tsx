'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScreenshotCarousel({ images }: { images: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpenIndex(null);
    setZoomed(false);
  };

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

  // Center the scroll position whenever we zoom in, so it opens centered
  // on the image rather than pinned to the top-left corner.
  useEffect(() => {
    if (!zoomed || !viewerRef.current) return;
    const el = viewerRef.current;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
  }, [zoomed]);

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

  // Doubled so the marquee can loop seamlessly — translateX(-50%) on this
  // track always lands exactly back at the start of the second copy.
  const track = [...images, ...images];

  return (
    <section className="mt-16">
      <div className="group/marquee overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 group-hover/marquee:[animation-play-state:paused]">
          {track.map((src, i) => {
            const realIndex = i % images.length;
            return (
              <button
                key={`${src}-${i}`}
                onClick={() => {
                  setOpenIndex(realIndex);
                  setZoomed(false);
                }}
                className="group relative flex-shrink-0 cursor-zoom-in overflow-hidden rounded-2xl border border-[#8E9096]/25 bg-[#12141a] transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_24px_rgba(31,220,210,0.15)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Outfit Maven screenshot ${realIndex + 1}`}
                  className="h-[420px] w-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0C0F]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 left-3 text-[11px] uppercase tracking-[0.1em] text-[#F5F5F7] opacity-0 transition-opacity duration-300 group-hover:opacity-90">
                  {String(realIndex + 1).padStart(2, '0')} · Tap to zoom
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
                setZoomed(false);
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
                setZoomed(false);
                setOpenIndex(openIndex + 1);
              }}
              className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[#8E9096]/30 text-[20px] text-[#8E9096] transition-colors hover:border-accent hover:text-accent md:right-8"
              aria-label="Next screenshot"
            >
              ›
            </button>
          )}

          <div
            ref={viewerRef}
            onClick={(e) => e.stopPropagation()}
            className={`max-h-[85vh] max-w-[92vw] ${zoomed ? 'overflow-auto' : 'overflow-hidden'}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[openIndex]}
              alt={`Outfit Maven screenshot ${openIndex + 1}`}
              onClick={() => setZoomed((z) => !z)}
              className={
                zoomed
                  ? 'w-auto max-w-none cursor-zoom-out'
                  : 'max-h-[85vh] max-w-[92vw] cursor-zoom-in object-contain'
              }
              style={zoomed ? { width: '180%' } : undefined}
            />
          </div>

          <span className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[12px] uppercase tracking-[0.1em] text-[#8E9096]">
            Click image to {zoomed ? 'zoom out' : 'zoom in'} · Esc to close
          </span>
        </div>
      )}
    </section>
  );
}