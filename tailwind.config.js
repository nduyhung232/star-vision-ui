/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': "#222831",
      'secondary': "#31363F",
      'third': "#76ABAE",
      'white': "#FFFFFF",
      'black': "#000000",
      'red': {
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c'
      },
      'sky': {
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#3b82f6',
        600: '#2563eb'
      },
      'gray': {
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151'
      },
      'lime': {
        400: '#a3e635'
      }
    },
    extend: {},
  },
  plugins: [],
}

