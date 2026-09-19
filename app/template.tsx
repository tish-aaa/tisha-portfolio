'use client';

import { m } from 'framer-motion';

// template.tsx remounts on every route change (unlike layout.tsx, which
// persists), so this runs its enter animation each time you land on a
// new page — homepage, /projects/outfit-maven, /projects/site-scraper.
// Nav and HomeBackground live in layout.tsx, outside this wrapper, so
// their position: fixed elements are never affected by this animation.
//
// Opacity-only, deliberately no y/transform here: a translateY offset
// briefly extends the page's scrollable height while it animates back
// to 0 (transforms affect scrollable overflow even though they don't
// affect layout), which is what was popping a scrollbar in and out on
// every navigation. Opacity has no such side effect.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  );
}