const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindcssAnimate = require('tailwindcss-animate')
const tailwindcssTypography = require('@tailwindcss/typography')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx,vue}',
  ],
  safelist: ['ProseMirror'],
  theme: {
    extend: {
      colors: {
        stone: colors.stone,
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
}
