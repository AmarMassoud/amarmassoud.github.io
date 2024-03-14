/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
      'custom-gray': '#F0F0F0',
      'custom-coral': '#f36a6b1a',
      'custom-red': '#F20E0F'
      
    },
    height:{
      '19rem': '19rem'

    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
  },
  plugins: [require("daisyui")],
  daisyui: {

    themes: [],
  },
}

