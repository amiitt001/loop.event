/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#00ff88",
        void: "#020304",
        surface: "#0d1117"
      }
    }
  },
  plugins: []
};
