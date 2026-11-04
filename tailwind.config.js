/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./*.html",
    "./src/**/*.{js,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EF233C",
        "primary-hover": "#D90429",
        "primary-container": "#FEE2E2",
        "on-primary-container": "#991B1B",
        surface: "#FFFFFF",
        "surface-dim": "#F4F4F6",
        "surface-card": "#FFFFFF",
        "on-surface": "#18181B",
        "on-surface-variant": "#52525B",
        "outline-border": "#E4E4E7"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace']
      }
    }
  },
  plugins: []
};
