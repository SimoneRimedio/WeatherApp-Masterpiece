import { updateWeatherJSON } from '../utils/getImageJSON';
import { getWeatherData } from '../utils/getWeatherData';
import { WeatherData, WeatherDataJSON } from '../types/types';
import { WeatherJSONProps } from '../types/types';
import axios from 'axios';

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
      const response = await axios.get(`https://web-production-63be.up.railway.app/api/getReverseGeocode?lat=${latitude}&lon=${longitude}`);
      console.log(response);
      
      const weatherData = await getWeatherData({ latitude, longitude });
      setCurrentLocation(response.data.address.town);
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