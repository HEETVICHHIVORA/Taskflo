/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blinker: 'blinker 1s linear infinite',
      },
      keyframes: {
        blinker: {
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}


