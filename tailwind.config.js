/** @type {import('tailwindcss').Config} */
import TwPrimeUI from 'tailwindcss-primeui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [TwPrimeUI],
}

