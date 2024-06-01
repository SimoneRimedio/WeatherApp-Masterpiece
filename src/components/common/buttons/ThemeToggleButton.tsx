import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../../../providers/ThemeProvider";
import React from "react";

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isClicked, setIsClicked] = React.useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
    setTheme(theme === "dark" ? "light" : "dark");
  };

  React.useEffect(() => {
    if (isClicked) {
      const timeoutId = setTimeout(() => {
        setIsClicked(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isClicked]);

  return (
    <button
      onClick={handleButtonClick}
      className={`text-text dark:text-card self-center" ${
        isClicked ? "animate-bounce" : ""
      }`}
    >
      {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </button>
  );
};

export default ThemeToggleButton;
