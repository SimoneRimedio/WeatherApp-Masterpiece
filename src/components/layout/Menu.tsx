import React from "react";
import MenuButton from "../../common/Button/MenuButton.tsx";

interface MenuProps {
  menuSelection: string;
  setMenuSelection: React.Dispatch<React.SetStateAction<string>>;
}

const Menu: React.FC<MenuProps> = ({ menuSelection, setMenuSelection }) => {
  return (
    <div className="flex justify-center items-center my-8 text-xl">
      <div className="flex flex-col sm:flex-row md:gap-4 sm:gap-3">
        <MenuButton
          label="Current"
          isSelected={menuSelection === "current"}
          onClick={() => setMenuSelection("current")}
        />
        <MenuButton
          label="Hourly"
          isSelected={menuSelection === "hourly"}
          onClick={() => setMenuSelection("hourly")}
        />
        <MenuButton
          label="Weekly"
          isSelected={menuSelection === "daily"}
          onClick={() => setMenuSelection("daily")}
        />
      </div>
    </div>
  );
};

export default Menu;
