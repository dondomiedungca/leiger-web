/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
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
  plugins: [],
};
