import { updateWeatherJSON } from "./getImageJSON";
import { getWeatherData } from "./getWeatherData";
import { getPosition } from "./getPosition";
import { WeatherData, WeatherDataJSON, WeatherJSONProps } from "../types/types";

interface FetchWeatherParams {
  setCurrentLocation: (location: string) => void;
  setWeatherData: (data: WeatherData | undefined) => void;
  setWeatherJSON: (json: WeatherJSONProps) => void;
  data: WeatherDataJSON;
  setError: (error: string | null) => void;
}

export const fetchWeatherByGeolocation = async ({
  setCurrentLocation,
  setWeatherData,
  setWeatherJSON,
  data,
  setError,
}: FetchWeatherParams): Promise<void> => {
  try {
    if (navigator.geolocation) {
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = pos.coords;
      const position = await getPosition(latitude, longitude, setError);
      const weatherData = await getWeatherData({ latitude, longitude });
      setCurrentLocation(position.address.town);
      setWeatherData(weatherData);
      setWeatherJSON(updateWeatherJSON(weatherData, data));
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    if (error instanceof GeolocationPositionError) {
      setError(
        "Error retrieving location. Make sure you have enabled geolocation in your browser."
      );
    } else {
      setError("Error fetching weather data.");
    }
  }
};
