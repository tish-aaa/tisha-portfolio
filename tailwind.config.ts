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
        midnight: '#0A1F1D',
        cyan: {
          light: '#22E1DF',
          DEFAULT: '#1FDCD2',
          deep: '#1DCFCA',
        },
        teal: {
          light: '#70C2BD',
          DEFAULT: '#45B2AB',
          dark: '#298A90',
          darker: '#19A99F',
          darkest: '#1D8A7A',
        },
        muted: '#94BCAC',
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
      },
      animation: {
        meshFlow: 'meshFlow 12s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};

export default config;
