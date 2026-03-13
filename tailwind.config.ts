import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        primary: '#22c55e',
        warning: '#ef4444',
        caution: '#f97316',
        textPrimary: '#f9fafb',
        textSecondary: '#9ca3af',
        cardBg: 'rgba(255,255,255,0.05)',
        borderSoft: 'rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
