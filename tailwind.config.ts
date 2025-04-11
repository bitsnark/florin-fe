import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        // Design system colors
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: {
          bg: 'var(--input-bg)',
          border: 'var(--input-border)',
        },
        label: {
          text: 'var(--label-text)',
        },
        ring: 'var(--ring)',
        // Project specific colors
        orange: {
          light: 'var(--orange-light)',
          DEFAULT: 'var(--orange)',
        },
        grey: {
          DEFAULT: 'var(--grey)',
          hover: 'var(--grey-hover)',
          border: 'var(--grey-border)',
        },
        black: {
          DEFAULT: 'var(--black)',
        },
        // Crypto colors
        bitcoin: {
          bg: 'var(--bitcoin-bg)',
          card: 'var(--card-bitcoin-bg)',
        },
        ethereum: {
          bg: 'var(--ethereum-bg)',
          card: 'var(--card-ethereum-bg)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          label: 'var(--text-label)',
        },
      },
      borderRadius: {
        lg: '8px',
        xl: '16px',
      },
      transitionTimingFunction: {
        florin: 'cubic-bezier(0.77,0,0.14,1)',
      },
    },
  },
  plugins: [],
};

export default config;
