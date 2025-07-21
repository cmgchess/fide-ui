/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                // <-- Add this line
    "./src/**/*.{js,jsx,ts,tsx}",  // All React source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
