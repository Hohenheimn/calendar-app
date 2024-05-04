/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#f13b68",
          500: "#cc0033",
        },
        secondary: {
          500: "#fed24e",
        },
      },
    },
  },
  plugins: [],
};
