import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <div className="container mx-auto px-2 sm:px-4 py-4">
        <p className="flex items-center space-x-2 ">
          <a href="/"><img alt="logo" src="/logo.png" className="w-12 h-12 flex-shrink-0"/></a>
          <span className="font-Poppins font-semibold tracking-tight whitespace-nowrap text-2xl text-titles">
            Weather App
          </span>
        </p>
      </div>
    </header>
  );
};

export default Header;
