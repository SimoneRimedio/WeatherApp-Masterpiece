/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {'BebasNeue': 'Bebas Neue', 'Nunito': 'Nunito', 'Poppins': 'Poppins'}
    },
    colors: {
      'bgk': '#E0DDCF',
      'card': "#F1F0EA",
      'text-card': '#2D232E',
      'text-header': '#2D232E',
      'tools': '#534B52',
      'tools-shadow': '#474448'
    }
  },
  plugins: [],
}
