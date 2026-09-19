'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const SpaceScene = dynamic(() => import('./SpaceScene'), { ssr: false });
const CursorSparkles = dynamic(() => import('./CursorSparkles'), { ssr: false });

// Rendered once in layout.tsx, outside app/template.tsx's transform-
// animated wrapper, so these position: fixed elements are never
// affected by page-transition animations.
//
// Both persist across every page — no mounting/unmounting per route.
// Only the globe is homepage-specific; it's hidden (not unmounted) on
// other pages via SpaceScene's showGlobe prop, keeping one continuous
// WebGL context site-wide instead of tearing it down per navigation.
export default function SiteBackground() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      <SpaceScene showGlobe={isHome} />
      <CursorSparkles />
    </>
  );
}