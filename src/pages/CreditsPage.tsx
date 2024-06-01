import { ReactElement } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import PageButton from "../components/common/buttons/PageButton";

const CreditsPage = (): ReactElement => {
  const onClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col font-Poppins">
      <Header />
      <div className="flex flex-col container mx-auto px-4 sm:px-6 justify-center items-center">
        <h1 className="dark:text-light text-dark text-5xl font-bold my-8">
          Credits
        </h1>
        <ul className="space-y-8 my-4">
          <li className="text-center">
            <h2 className="dark:text-light text-dark text-3xl font-medium mb-2">
              Data provided by OpenMeteo
            </h2>
            <p className="dark:text-light text-dark text-lg font-light">
              Open-Meteo partners with national weather services to bring you
              open data with high resolution, ranging from 1 to 11 kilometers.
              Our powerful APIs intelligently select the most suitable weather
              models for your specific location, ensuring accurate and reliable
              forecasts.
            </p>
            <a
              href="https://open-meteo.com/"
              className="dark:text-light text-dark text-blue-500 underline mt-2 inline-block"
            >
              https://open-meteo.com/
            </a>
          </li>
          <li className="text-center">
            <h2 className="dark:text-light text-dark text-3xl mb-2 font-medium">
              Geocode data provided by Geocoding API
            </h2>
            <a
              href="https://geocode.maps.co/"
              className="dark:text-light text-dark text-blue-500 underline mt-2 inline-block"
            >
              https://geocode.maps.co/
            </a>
          </li>

          <li className="text-center">
            <h2 className="dark:text-light text-dark text-3xl font-medium mb-2">
              Logo by Kimberly Coppola
            </h2>
          </li>
          <li className="text-center">
            <h2 className="dark:text-light text-dark text-3xl font-semibold mb-2">
              Developed by Simone Rimedio
            </h2>
          </li>
        </ul>
      </div>
      <PageButton label={"Home"} isSelected={false} onClick={onClick}/>
      <Footer />
    </div>
  );
};

export default CreditsPage;
