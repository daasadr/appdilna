/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0070f3',
        secondary: '#6b7280',
        'copper': '#b87333',
        'brass': '#b5a642',
        'parchment': '#f5f1e6',
        'ink': '#1a1a1a',
        'vintage-red': '#8b0000',
      },
      fontFamily: {
        'sans': ['var(--font-inter)'],
        'display': ['var(--font-playfair)'],
      },
      backgroundImage: {
        'blueprint': "url('/images/blueprint-bg.png')",
        'wood-texture': "url('/images/wood-texture.png')",
        'wood-texture-dark': "linear-gradient(rgba(0,0,0,0.08),rgba(0,0,0,0.08)), url('/images/wood-texture.png')",
      },
    },
  },
  plugins: [],
} 