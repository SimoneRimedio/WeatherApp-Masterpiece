import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "../../../providers/ThemeProvider";

const ThemeToggleButton: React.FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-end">
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-text dark:text-card">
        {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </button>
    </div>
  );
};

export default ThemeToggleButton;
