/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "3/6": "50%",
      },
      colors: {
        primary: {
          grayPrimary: "#b3b3b3",
        },
      },
      backgroundColor: {
        BlackTheme: {
          aside: "#1C1D22",
          roudend: "rgba(255, 255, 255, 0.10)",
          card: "#292B31",
          list: "#24262C",
          fundo: "#2A2B2F",
        },
      },
    },
  },
  plugins: [],
});
