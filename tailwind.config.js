/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Green gradient theme (from brand guidelines)
        'green-dark': '#0d4d2d',      // Dark forest green
        'green-light': '#00ff88',      // Bright emerald
        'accent-pink': '#FF0F01',
        'accent-mint': '#88FF00',
        // Status colors
        'status-excellent': '#22c55e',  // Green (90-100%)
        'status-good': '#eab308',       // Yellow (70-89%)
        'status-warning': '#f97316',    // Orange (50-69%)
        'status-critical': '#ef4444',   // Red (<50%)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'auto-lg': 'clamp(1rem, 2vw, 1.5rem)',
        'auto-xl': 'clamp(1.5rem, 3vw, 2.5rem)',
      },
      minHeight: {
        'touch': '60px',
      },
      minWidth: {
        'touch': '60px',
      },
    },
  },
  plugins: [],
}



