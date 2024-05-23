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
        BebasNeue: "Bebas Neue",
        Nunito: "Nunito",
        Poppins: "Poppins",
      },
    },
    colors: {
      bgk: "#FFFFF",
      card: "#FDF7FA",
      "text-card": "#2D232E",
      header: "#3B293B",
      tools: "#3B293B",
      "tools-shadow": "#807C80",
    },
  },
  plugins: [],
};
