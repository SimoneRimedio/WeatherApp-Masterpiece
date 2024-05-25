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
    <div className="flex justify-center items-center mt-5 mb-5 text-lg">
      <button
        onClick={() => setMenuSelection("current")}
        className={`text-left mx-2 ${
          menuSelection === "current" ? "font-bold" : ""
        } bg-details text-titles hover:bg-button-details focus:outline-none focus:ring-2 focus:ring-button-details font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2`}
      >
        <QueryBuilderIcon className="inline-block mb-[3px]" /> Current
      </button>
      <button
        onClick={() => setMenuSelection("hourly")}
        className={`text-left mx-2 ${
          menuSelection === "hourly" ? "font-bold" : ""
        } bg-details text-titles hover:bg-button-details focus:outline-none focus:ring-2 focus:ring-button-details font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2`}
      >
        <CalendarTodayIcon className="inline-block mb-[3px]" /> Hourly
      </button>
      <button
        onClick={() => setMenuSelection("daily")}
        className={`text-left mx-2 ${
          menuSelection === "daily" ? "font-bold" : ""
        } bg-details text-titles hover:bg-button-details focus:outline-none focus:ring-2 focus:ring-button-details font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2`}
      >
        <CalendarMonthIcon className="inline-block mb-[3px]" /> Weekly
      </button>
    </div>
  );
};

export default Menu;
