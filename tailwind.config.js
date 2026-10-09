/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#e2b714', // Classic monkeytype yellow
        },
        slate: {
          900: '#323437',
          800: '#2c2e31',
          700: '#4a4d51',
          500: '#646669',
          400: '#7a7c80',
          300: '#d1d0c5',
          200: '#e2e2e2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Fira Code"', '"Roboto Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
