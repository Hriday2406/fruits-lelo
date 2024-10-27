/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Roboto"', "sans-serif"],
        mono: ['"Roboto Mono"', "serif"],
      },
      colors: {
        bg: "#0F0F0F",
        secondary: "#1F1F1F",
        accent: "#AE9B84",
        dash: "#262626",
        gray: "#676665",
        red: "#FF0000",
      },
    },
  },
  plugins: [],
};

