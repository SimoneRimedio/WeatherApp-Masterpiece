/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {'BebasNeue': 'Bebas Neue', 'Nunito': 'Nunito', 'Poppins': 'Poppins'}
    },
  },
  plugins: [],
}
