import  useFetch from '../hooks/useFetch';
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
}

export const fetchWeatherByGeolocation = async ({ setCurrentLocation, setWeatherData, setWeatherJSON, data}: FetchWeatherParams): Promise<void> => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const getPosition = await useFetch({ url: `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${Tokens.GeocodeToken}` });
        const weatherData = await getWeatherData({ latitude, longitude });
        setCurrentLocation(getPosition.data.address.county);
        setWeatherData(weatherData);
        setWeatherJSON(updateWeatherJSON(weatherData, data));
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        alert("Errore durante il recupero della posizione. Assicurati di aver attivato la geolocalizzazione nel tuo browser.");
      }
    );
  }
  else {
    console.error("Geolocation not supported");
    alert("La geolocalizzazione non è supportata dal tuo browser.");
  }
};
