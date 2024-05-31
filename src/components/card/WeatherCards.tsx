import React from "react";
import CurrentCard from "./CurrentCard";
import { WeatherDataType, WeatherImgProps } from "../../types/types";

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
      <h1 className="text mb-4 font-Poppins font-semibold text-titles">
        {displayLocation}
      </h1>
      <div className="flex flex-col justify-center items-center text-center p-4 rounded-lg bg-blur">
        <img
          src={weatherImg.image}
          alt="weatherIcon"
          className="w-30 h-30 mb-2"
        />
        <h1 className="text-xl mb-4 text-titles font-Poppins font-semibold">{weatherImg.description}</h1>
      </div>
      {weatherData && <CurrentCard data={weatherData}></CurrentCard>}
    </div>
  );
};

export default WeatherCards;
