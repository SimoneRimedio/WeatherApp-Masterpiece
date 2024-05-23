import React from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface MenuProps {
  menuSelection: string;
  setMenuSelection: React.Dispatch<React.SetStateAction<string>>;
}

const Menu: React.FC<MenuProps> = ({
  menuSelection,
  setMenuSelection,
}) => {
  return (
    <div className="flex justify-center mt-5 mb-5 text-lg">
      <button onClick={() => setMenuSelection("current")} className={`text-left mx-2 ${ menuSelection === "current" ? "font-bold" : ""} bg-card hover:bg-tools-shadow text-white font-bold py-2 px-4 rounded shadow-lg`}>
        <QueryBuilderIcon className="inline-block align-middle" /> Current
      </button>
      <button onClick={() => setMenuSelection("hourly")} className={`text-left mx-2 ${ menuSelection === "hourly" ? "font-bold" : ""} bg-card hover:bg-tools-shadow text-white font-bold py-2 px-4 rounded shadow-lg`}>
        <CalendarTodayIcon className="inline-block align-middle" /> Hourly
      </button>
      <button onClick={() => setMenuSelection("daily")} className={`text-left mx-2 ${ menuSelection === "daily" ? "font-bold" : ""} bg-card hover:bg-tools-shadow text-white font-bold py-2 px-4 rounded shadow-lg`}>
        <CalendarMonthIcon className="inline-block align-middle" /> Weekly
      </button>
    </div>
  );
};

export default Menu;
