import React from "react";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MenuButton from "../../common/Button/MenuButton.tsx";

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
      <MenuButton
        icon={<QueryBuilderIcon />}
        label="Current"
        isSelected={menuSelection === "current"}
        onClick={() => setMenuSelection("current")}
      />
      <MenuButton
        icon={<CalendarTodayIcon />}
        label="Hourly"
        isSelected={menuSelection === "hourly"}
        onClick={() => setMenuSelection("hourly")}
      />
      <MenuButton
        icon={<CalendarMonthIcon />}
        label="Weekly"
        isSelected={menuSelection === "daily"}
        onClick={() => setMenuSelection("daily")}
      />
    </div>
  );
};

export default Menu;
