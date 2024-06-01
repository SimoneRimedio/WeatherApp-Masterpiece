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
      card: "#FDF7FA",
      details: "#FF6A1A",
      "button-details": "#c2410c",
      light: "#F5F5F5",
      dark: "#292524",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
