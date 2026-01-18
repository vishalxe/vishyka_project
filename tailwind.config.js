/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Professional color palette
        'green-dark': '#064e3b',      // Dark emerald
        'green-light': '#10b981',      // Emerald-500
        'accent-pink': '#ec4899',
        'accent-mint': '#34d399',
        // Status colors with better contrast
        'status-excellent': '#10b981',  // Emerald-500 (90-100%)
        'status-good': '#fbbf24',       // Amber-400 (70-89%)
        'status-warning': '#f97316',    // Orange-500 (50-69%)
        'status-critical': '#ef4444',   // Red-500 (<50%)
        // Additional professional colors
        'slate': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
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



