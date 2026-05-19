/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#061226',
        card: '#0B1B33',
        border: '#1E3A5F',
        primary: '#3B82F6',
        accent: '#8B5CF6',
        cyan: '#06B6D4',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(11, 27, 51, 0.8) 0%, rgba(6, 18, 38, 0.9) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
