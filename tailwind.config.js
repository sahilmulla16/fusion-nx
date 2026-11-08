/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#291C0E',
        walnut: '#6E473B',
        taupe: '#A78D78',
        'warm-grey': '#BEB5A9',
        cream: '#E1D4C2',
        // Helpful palette shades for subtle borders and overlays
        'espresso-dark': '#1C130A',
        'espresso-light': '#382614',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pop': 'pop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'star-burst': 'starBurst 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.92)' },
          '50%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        starBurst: {
          '0%': { transform: 'scale(0.8) rotate(-10deg)', opacity: '0.7' },
          '50%': { transform: 'scale(1.25) rotate(5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
