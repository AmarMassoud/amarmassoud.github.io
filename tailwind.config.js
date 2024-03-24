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
    maxHeight:{
      '45': '35rem'
    },
    screens: {
      'sm': {'max':'640px'},  // Small screens and up
      'md': {'max':'768'},  // Medium screens and up
      'lg': {'max':'1024px'}, // Large screens and up
      'xl': {'max':'1208px'}, // Extra large screens and up
    },
  },
  },
  plugins: [require("daisyui")],
  daisyui: {

    themes: [],
  },
  purge:{
    enabled: true,
    content: ["./pages/**/*.{html,js}"],

    safelist: [
      '@media screen and (max-width: 1024px) { :root { font-size: 12px; } }'
    ]
  }
}

