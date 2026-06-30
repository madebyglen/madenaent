/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#f5efe3',
          100: '#e8dcc8',
          200: '#d4c39e',
          300: '#c9a96e',
          400: '#b8924a',
          500: '#a67c3d',
          600: '#8b6a33',
          700: '#6b5228',
          800: '#4a381c',
          900: '#2a1f10',
        },
        cream: {
          50: '#ffffff',
          100: '#faf6f0',
          200: '#f5efe3',
          300: '#f0e9df',
          400: '#e8e0d4',
          500: '#d4c8b8',
        },
        dark: {
          50: '#6a6a6a',
          100: '#4a4a4a',
          200: '#3a3a3a',
          300: '#2a2a2a',
          400: '#222222',
          500: '#1a1a1a',
          600: '#141414',
          700: '#0a0a0a',
        },
      },
    },
  },
  plugins: [],
};
