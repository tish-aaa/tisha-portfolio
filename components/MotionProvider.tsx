'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

// Loads only the "domAnimation" feature set — opacity, transform, color,
// and scroll-linked values — rather than framer-motion's full feature
// bundle (which also includes drag, layout animations, and gestures we
// don't use). Wrapped once here so every m.* component in the app shares
// the same lazily-loaded bundle instead of each one loading its own.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}