import React from "react";

interface MenuButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  label,
  onClick,
}) => {
  return (
      <button className="relative" onClick={onClick}>
        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-card-shadow "></span>
        <span className="fold-semibold font-Poppins relative inline-block h-full w-full rounded border-2 border-text bg-card px-3 py-1 text-base font-bold text-text transition duration-100  hover:bg-details">
         {label}
        </span>
      </button>
  );
};

export default MenuButton;
