/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: "320px",
        tablet: "480px",
        tabx1: "520px",
      },
    },
  },
  plugins: [],
};
