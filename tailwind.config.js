/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class", // for Tailwind
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
