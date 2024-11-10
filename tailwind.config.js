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
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#AE9B84 #0F0F0F",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#0F0F0F",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#AE9B84",
            borderRadius: "100px",
            border: "1px solid white",
          },
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
