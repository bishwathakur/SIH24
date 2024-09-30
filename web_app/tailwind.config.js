/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',       // Neon green color
        'neon-green-light': '#5eff6f', // Light neon green for hover effect
      },
      backgroundImage: {
        'custom-bg': "url('../src/assets/uploads.mp4')", // Update with your image path
      },
    },
  },
  plugins: [],
}