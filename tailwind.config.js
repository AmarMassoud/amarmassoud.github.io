/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
      'custom-gray': '#F0F0F0',
      
    },
    height:{
      '19rem': '19rem'

    },
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
  },
  },
  plugins: [],
}

