import { useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import SettingsIcon from "@mui/icons-material/Settings";

const SettingsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center p-5 text-dark dark:text-light"
      >
        <SettingsIcon
          className={`transition duration-300 ease-in-out ${
            isAnimating ? "animate-spin" : ""
          }`}
        />
      </button>
      {isOpen && (
        <ul className="flex flex-col justify-center items-center text-dark dark:text-light p-2 m-2 rounded-md absolute top-12 left-1/2 transform -translate-x-1/2 font-semibold font-Poppins shadow-sm shadow-dark dark:shadow-light bg-light dark:bg-dark">
          <li className="flex items-center m-2 gap-2">
            Theme
            <ThemeToggleButton />
          </li>
        </ul>
      )}
    </div>
  );
};

export default SettingsButton;
