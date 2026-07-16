import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#ECF8F8',
        obsidian: '#0B0C0F',
        silver: {
          light: '#F5F5F7',
          DEFAULT: '#D8D9DE',
          dim: '#8E9096',
        },
        ice: '#7C93B8',
        muted: '#6B6D74',
      },
      fontFamily: {
        garamond: ['var(--font-garamond)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        meshFlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        meshFlow: 'meshFlow 12s ease-in-out infinite alternate',
        shine: 'shine 5s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
