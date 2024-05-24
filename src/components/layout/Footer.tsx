import { ReactElement } from "react";

const Footer = (): ReactElement => {
  return (
    <footer className="px-4 sm:px-6 py-6 mt-auto">
      <p className="text-center text-sm text-tools">
        © {new Date().getFullYear()} Weather App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
