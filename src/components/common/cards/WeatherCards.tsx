import React from "react";
import CurrentCard from "./CurrentCard";
import { WeatherDataType, WeatherImgProps } from "../../../types/types";

interface WeatherCardsProps {
  displayLocation: string;
  weatherImg: WeatherImgProps;
  weatherData?: WeatherDataType;
}

const WeatherCards: React.FC<WeatherCardsProps> = ({
  displayLocation,
  weatherImg,
  weatherData,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-lg my-4 font-Poppins font-semibold text-dark dark:text-light">
        {displayLocation}
      </h1>
      <div className="flex flex-col justify-center items-center text-center p-4 rounded-lg bg-blur">
        <img
          src={weatherImg.image}
          alt="weatherIcon"
          className="w-30 h-30 mb-2"
        />
        <h1 className="text-xl mb-4 text-dark dark:text-light font-Poppins font-semibold">{weatherImg.description}</h1>
      </div>
      {weatherData && <CurrentCard data={weatherData}></CurrentCard>}
    </div>
  );
};

export default WeatherCards;
