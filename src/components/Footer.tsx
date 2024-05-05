import { ReactElement } from "react";

const Footer = (): ReactElement => {
  return (
    <footer className="relative bottom-0 w-full text-center py-4 justify-center font-BebasNeue mt-10 font-extralight">
      <p>Data provided by Open Meteo</p>
      <p>by Simone Rimedio</p>
    </footer>
  );
};

export default Footer;
