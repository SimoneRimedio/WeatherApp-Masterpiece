/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "background-img": "url('/src/assets/background.jpg')",
      },
      blur: {
        bg: "40px",
      },
      fontFamily: {
        'Poppins':'Poppins',
      },
    },
    colors: {
      bgk: "#0B1F1D",
      card: "#FDF7FA",
      "card-shadow": "#4b5563",
      text: "#000000",
      titles: "#FFFFFF",
      details: "#FF6A1A",
      "bgk-grd": "#688edf",
      "button-details": "#c2410c",
    },
  },
  plugins: [],
};
