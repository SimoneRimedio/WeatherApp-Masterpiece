import { WeatherData, WeatherDataImg, WeatherImgProps } from "../types/types";

export const updateWeatherImg = (
  weatherData: WeatherData | undefined,
  data: WeatherDataImg
): WeatherImgProps => {
  const code = weatherData?.current.weatherCode;
  const currentWeather = typeof code === "number" ? data[code] : null;
  const isDay = weatherData?.current.isDay;
  const description = isDay
    ? currentWeather?.day.description
    : currentWeather?.night.description;
  const image = isDay
    ? currentWeather?.day.image
    : currentWeather?.night.image;
  return { description: description ?? "", image: image ?? "" };
};
