import React from "react";
import LogoDevIcon from "@mui/icons-material/LogoDev";

const Header: React.FC = () => {
  return (
    <header>
      <div className="container mx-auto px-2 sm:px-4 py-4">
        <p className="flex items-center space-x-1 ">
          <LogoDevIcon className="w-24 h-24 flex-shrink-0 text-details" />
          <span className="font-bold tracking-tight whitespace-nowrap text-2xl text-titles">
            Weather App
          </span>
        </p>
      </div>
    </header>
  );
};

export default Header;