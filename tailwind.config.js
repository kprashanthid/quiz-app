/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        gradientShift: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        "gradient-animation": "gradientShift 15s ease infinite",
      },
      colors: {
        primary: "#9b4d96",
        secondary: "#bc6cc6",
      },
    },
  },
  plugins: [],
};
