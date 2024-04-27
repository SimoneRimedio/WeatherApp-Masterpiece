import { WeatherData, WeatherDataJSON, WeatherJSONProps } from "../types/types";

export const updateWeatherJSON = (weatherData: WeatherData | undefined, data: WeatherDataJSON): WeatherJSONProps => {
    const code = weatherData?.current.weatherCode; 
    const currentWeather = typeof code === 'number' ? data[code] : null;
    const isDay = weatherData?.current.isDay;
    const description = isDay ? currentWeather?.day.description : currentWeather?.night.description;
    const image = isDay ? currentWeather?.day.image : currentWeather?.night.image;
  
    return { description: description ?? '', image: image ?? '' };
  };
  