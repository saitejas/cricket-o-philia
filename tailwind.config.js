/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        handjet: ["Handjet"],
      },
      colors: {
        primaryBg: "#3A4D89",
        white: "#FFFFFF",
        tableGradientFrom: "#082e4f",
        tableGradientTo: "#08243e",
        playerGradientFrom: "#044885",
        playerGradientTo: "#06579f"
      },
    },
  },
  plugins: [],
};
