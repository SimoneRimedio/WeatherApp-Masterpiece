import React from "react";

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  icon,
  label,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-left mx-2 ${
        isSelected ? "font-bold" : ""
      } bg-details text-titles hover:bg-button-details focus:outline-none focus:ring-2 focus:ring-button-details font-semibold font-Poppins rounded-full text-md px-5 py-2.5 text-center me-2 mb-2`}
    >
      <span className="inline-block mb-[3px]">{icon}</span> {label}
    </button>
  );
};

export default MenuButton;
