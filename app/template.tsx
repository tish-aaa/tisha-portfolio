'use client';

import { m } from 'framer-motion';

// template.tsx remounts on every route change (unlike layout.tsx, which
// persists), so this runs its enter animation each time you land on a
// new page — homepage, /projects/outfit-maven, /projects/site-scraper.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  );
}