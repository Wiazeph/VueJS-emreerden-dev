/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Heebo: ['Heebo', 'sans-serif'],
        Caveat: ['Caveat', 'cursive']
      },

      keyframes: {
        scaler: {
          '0%, 40%, 100%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(1.05)' }
        }
      },

      animation: {
        scaler: 'scaler 2.3s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
