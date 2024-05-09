const withMT = require("@material-tailwind/html/utils/withMT");

module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/public/**/*.{html,js}", // Add the public folder here
  ],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#F0F0F0",
        "custom-coral": "#f36a6b1a",
        "custom-red": "#F20E0F",
      },
      height: {
        "19rem": "19rem",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      maxHeight: {
        45: "35rem",
      },
      screens: {
        "-sm": { max: "640px" },
        "-md": { max: "768px" },
        "-lg": { max: "1024px" },
        "-xl": { max: "1208px" },
      },
    },
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [],
  },
  purge: {
    enabled: true,
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/public/**/*.{html,js}", // Add the public folder here
    ],
    safelist: [
      "@media screen and (max-width: 1024px) { :root { font-size: 12px; } }",
    ],
  },
});
