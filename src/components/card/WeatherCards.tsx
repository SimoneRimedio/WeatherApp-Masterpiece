import React from "react";
import CurrentCard from "./CurrentCard";
import { WeatherDataType, WeatherJSONProps } from "../../types/types";

interface WeatherCardsProps {
  displayLocation: string;
  weatherJSON: WeatherJSONProps;
  weatherData?: WeatherDataType;
}

const WeatherCards: React.FC<WeatherCardsProps> = ({
  displayLocation,
  weatherJSON,
  weatherData,
}) => {
  return (
    <>
      <h1 className="text-md mb-4 font-Poppins font-bold text-tools ">
        {displayLocation}
      </h1>
      <div className="text-center p-4 rounded-lg bg-blur">
        <img
          src={weatherJSON.image}
          alt="weatherIcon"
          className="w-30 h-30 mb-2"
        />
        <h1 className="text-xl mb-4 text-tools">{weatherJSON.description}</h1>
      </div>
      {weatherData && <CurrentCard data={weatherData}></CurrentCard>}
    </>
  );
};

export default WeatherCards;
