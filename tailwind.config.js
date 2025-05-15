/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        'text-white': '#fff',
        'text': '#0d0d0d',
        'textp': '#0d0d0d',
        'palet1': '#9ED9F5',
        'palet2': '#F3A0A2',
        'palet3': '#E05679',
        'hoper': '#FFE7E7',
        'palettxt': '#0d0d0d',
        'bag-primary': '#f5f5f5',
        'bag-primary-dark': '#0a0a0a',
        'bg-negmod': '#1E1E1E',
        'primary': '#797d68',
        'secondary': '#d5d8cf',
        'secondary2': 'rgba(0, 0, 0, 0.03)',
        'transpa': 'transparent',
        'bg-bok-sec': 'hsl(80, 10%, 83%, 30%)',
        'accent': '#b7bdb2',
        '--static7':  'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
