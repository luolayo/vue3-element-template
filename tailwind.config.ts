import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.vue',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      rotate: {
        360: '360deg',
      },
    },
  },
  plugins: [],
} satisfies Config
