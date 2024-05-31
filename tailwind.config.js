/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "380px",
      md: "480px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        Poppins: "Poppins",
      },
    },
    colors: {
      bgk: "#63474D",
      card: "#FDF7FA",
      "card-shadow": "#4b5563",
      text: "#000000",
      titles: "#000000",
      details: "#FF6A1A",
      "bgk-grd": "#688edf",
      "button-details": "#c2410c",
    },
  },
  plugins: [],
};
