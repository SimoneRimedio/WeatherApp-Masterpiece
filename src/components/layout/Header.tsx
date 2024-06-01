import React from "react";
import ThemeToggleButton from "../common/buttons/ThemeToggleButton";
import Title from "../common/title/Title";

const Header: React.FC = () => {
  return (
    <header>
      <div className="container flex flex-row justify-between mx-auto p-3">
        <Title />
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default Header;
