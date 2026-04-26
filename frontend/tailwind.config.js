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
        'indigo-night': {
          DEFAULT: '#102542',
          50: '#e8ecf2',
          100: '#c5cfe0',
          200: '#9eafcc',
          300: '#778fb8',
          400: '#5a77a8',
          500: '#3d5f99',
          600: '#2d4a7a',
          700: '#1e365c',
          800: '#102542',
          900: '#081428',
          950: '#040a14',
        },
        'crimson-rose': {
          DEFAULT: '#D1495B',
          50: '#fcedef',
          100: '#f8d5d9',
          200: '#f0abb4',
          300: '#e8818e',
          400: '#df5769',
          500: '#D1495B',
          600: '#b83a4a',
          700: '#9a2e3d',
          800: '#7c2530',
          900: '#5e1c24',
          950: '#400f18',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.08)',
          medium: 'rgba(255, 255, 255, 0.12)',
          heavy: 'rgba(255, 255, 255, 0.18)',
        },
      },
      fontFamily: {
        'heading': ['Fraunces', 'serif'],
        'body': ['DM Serif Text', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(209, 73, 91, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(209, 73, 91, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.4)',
        'neon': '0 0 15px rgba(209, 73, 91, 0.5)',
        'neon-lg': '0 0 30px rgba(209, 73, 91, 0.7)',
      },
    },
  },
  plugins: [],
}
