/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "IRANYekanX",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit , minmax(280px , 1fr))",
        container: "minmax(auto , 1440px)",
      },
    },
  },
  plugins: [],
};
