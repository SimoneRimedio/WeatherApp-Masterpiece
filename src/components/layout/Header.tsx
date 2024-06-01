import React from "react";
import Title from "../common/title/Title";
import SettingsButton from "../common/buttons/SettingsButton";

const Header: React.FC = () => {
  return (
    <header>
      <div className="container flex flex-row justify-between mx-auto p-3">
        <Title />
        <SettingsButton/>
      </div>
    </header>
  );
};

export default Header;
