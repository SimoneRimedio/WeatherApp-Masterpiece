import useFetch from '../hooks/useFetch';
import { Tokens } from '../utils/env';
import { updateWeatherJSON } from '../utils/getImageJSON';
import { getWeatherData } from '../utils/getWeatherData';
import { WeatherData, WeatherDataJSON } from '../types/types';
import { WeatherJSONProps } from '../types/types';

interface FetchWeatherParams {
  setCurrentLocation: (location: string) => void;
  setWeatherData: (data: WeatherData | undefined) => void;
  setWeatherJSON: (json: WeatherJSONProps) => void;
  data: WeatherDataJSON;
  setError: (error: string | null) => void;
}

export const fetchWeatherByGeolocation = async ({ setCurrentLocation, setWeatherData, setWeatherJSON, data, setError }: FetchWeatherParams): Promise<void> => {
  try {
    if (navigator.geolocation) {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = pos.coords;
      const getPosition = await useFetch({ url: `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${Tokens.GeocodeToken}` });
      const weatherData = await getWeatherData({ latitude, longitude });
      setCurrentLocation(getPosition.data.address.county);
      setWeatherData(weatherData);
      setWeatherJSON(updateWeatherJSON(weatherData, data));
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    if (error instanceof GeolocationPositionError) {
      setError("Error retrieving location. Make sure you have enabled geolocation in your browser.");
    } else {
      setError("Error fetching weather data.");
    }
  }
};
