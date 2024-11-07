/** @type {import('tailwindcss').Config} */

const { colors } = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primaryLight: 'var(--color-primary-light)',
        secondary: 'var(--color-secondary)',
        disabled: 'var(--color-disabled)',
      }, 
    }
  },
  plugins: [],
}