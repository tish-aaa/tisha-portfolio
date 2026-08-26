// source for the site's palette, mirrored from tailwind.config.ts.
// If a value changes here, change it in tailwind.config.ts too (and vice versa) — they're meant to stay identical.

export const colors = {
  obsidian: '#0B0C0F',
  silverLight: '#F5F5F7',
  silver: '#D8D9DE',
  silverDim: '#8E9096',
  bodyText: '#B8BABE',
  accent: '#1FDCD2',
  accentHover: '#22E1DF',
  amber: '#F5A623',
  ice: '#7C93B8',
  muted: '#6B6D74',
  cream: '#ECF8F8',
} as const;

export type ColorKey = keyof typeof colors;
