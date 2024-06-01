import React from "react";

interface MenuButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ label, onClick }) => {
  return (
    <div className="flex justify-center items-center my-8 text-xl">
      <div className="flex flex-col sm:flex-row md:gap-4 sm:gap-3">
        <button className="relative" onClick={onClick}>
          <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-dark dark:bg-light "></span>
          <span className="fold-semibold font-Poppins relative inline-block h-full w-full rounded border-2 border-text bg-light px-3 py-1 text-base font-bold text-text transition duration-100  hover:bg-details dark:bg-dark dark:text-light">
           {label}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MenuButton;
