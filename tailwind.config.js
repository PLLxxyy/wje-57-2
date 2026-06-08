/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        coffee: {
          50: '#FFF8E6',
          100: '#FFEFD5',
          200: '#FFE4B5',
          300: '#DEB887',
          400: '#D2B48C',
          500: '#C4A484',
          600: '#A0522D',
          700: '#8B4513',
          800: '#654321',
          900: '#3E2723',
        },
        cream: {
          50: '#FFFEF7',
          100: '#FFFBEB',
          200: '#FEF3C7',
        },
      },
      fontFamily: {
        sans: ['Noto Sans SC', 'sans-serif'],
        serif: ['Noto Serif SC', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      boxShadow: {
        'card': '0 10px 40px -10px rgba(62, 39, 35, 0.2)',
        'card-hover': '0 20px 60px -10px rgba(62, 39, 35, 0.3)',
      },
    },
  },
  plugins: [],
};
