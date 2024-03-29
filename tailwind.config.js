/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      minHeight: {
        "1/2": "50%",
      },
      maxHeight: {
        "1/2": "50%",
      },
      fontSize: {
        "2xs": "10px",
      },
    },
    screens: {
      xs: "450px",

      sm: "640px",

      md: "768px",

      lg: "1024px",

      lga: "1260px",

      xl: "1280px",

      mda: "896px",
    },
  },
  plugins: [require("flowbite/plugin")],
};
