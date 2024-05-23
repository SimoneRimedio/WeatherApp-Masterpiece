import { ReactElement } from "react";

const Footer = (): ReactElement => {
  return (
    <footer className="relative bottom-0 w-full text-center py-4 justify-center font-Poppins mt-10 text-card">
      <p>Data provided by Open Meteo</p>
      <p>by Simone Rimedio</p>
    </footer>
  );
};

export default Footer;
