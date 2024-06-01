import { ReactElement } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const CreditsPage = (): ReactElement => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col container m-auto px-4 sm:px-6 justify-center items-center">
        <h1 className="dark:text-light text-dark text-5xl font-Poppins">404</h1>
        <p className="text-3xl font-Poppins">Page not found</p>
      </div>
      <Footer />
    </div>
  );
};

export default CreditsPage;
