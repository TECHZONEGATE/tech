/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#102B4E',
          deep: '#071B33',
          royal: '#245A92',
          surface: '#153661',
          light: '#1e477a',
        },
        gold: {
          DEFAULT: '#D8A85F',
          soft: '#F0CC8C',
          dark: '#B88636',
          light: '#FBF3E4',
          surface: '#FDF8F0',
        },
        brand: {
          offwhite: '#F8FAFC',
          bluegray: '#EDF3F8',
          dark: '#1B2B40',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(7, 27, 51, 0.08), 0 0 1px 1px rgba(7, 27, 51, 0.05)',
        'premium-lg': '0 30px 60px -20px rgba(7, 27, 51, 0.16), 0 0 1px 1px rgba(7, 27, 51, 0.08)',
        'gold-glow': '0 10px 30px -10px rgba(216, 168, 95, 0.35)',
        'navy-glow': '0 15px 35px -10px rgba(16, 43, 78, 0.45)',
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #071B33 0%, #102B4E 60%, #173864 100%)',
        'navy-radial': 'radial-gradient(circle at top right, #173864 0%, #071B33 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F0CC8C 0%, #D8A85F 100%)',
        'subtle-grid': 'radial-gradient(rgba(216, 168, 95, 0.15) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
