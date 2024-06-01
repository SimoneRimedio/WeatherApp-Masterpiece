import React from "react";

const Title: React.FC = () => {
  return (
    <p className="flex items-center space-x-2 ">
      <a href="/">
        <img alt="logo" src="/logo.png" className="w-12 h-12 flex-shrink-0" />
      </a>
      <span className="font-Poppins font-semibold tracking-tight whitespace-nowrap text-2xl text-dark dark:text-light">
        Weather App
      </span>
    </p>
  );
};

export default Title;
