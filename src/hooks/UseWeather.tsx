import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { WeatherData, WeatherImgProps } from "../types/types";
import { getGeocode, getReverseGeocode } from "../services/geocodeApi";
import getWeatherData from "../services/weatherApi";
import data from "../assets/weather.json";
import { getGeolocation, handleGeolocationError } from "../utils/geolocation";
import { updateWeatherImg } from "../utils/weatherImg";

const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [currentLocation, setCurrentLocation] = useState("");
  const [displayLocation, setDisplayLocation] = useState("");
  const [weatherImg, setWeatherImg] = useState<WeatherImgProps>({ description: "", image: "" });
  const [menuSelection, setMenuSelection] = useState("current");
  const [error, setError] = useState<string | null>(null);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentLocation(event.target.value);
  };

  const handleLocation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const pos = await getGeocode(currentLocation);
      const { latitude, longitude, name, country } = pos.data.results[0];

      const weatherData = await getWeatherData({ latitude, longitude });
      setWeatherData(weatherData);
      setWeatherImg(updateWeatherImg(weatherData, data));
      setDisplayLocation(`${name}, ${country}`);
    } catch (err: any) {
      setError(`Location Searching Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkPosition = async () => {
    try {
      setLoading(true);
      const pos = await getGeolocation();
      const { latitude, longitude } = pos.coords;
      
      const reverseGeocodeResponse = await getReverseGeocode(latitude, longitude);
      const weatherData = await getWeatherData({ latitude, longitude });

      setCurrentLocation(reverseGeocodeResponse.data.address.town);
      setWeatherData(weatherData);
      setWeatherImg(updateWeatherImg(weatherData, data));
    } catch (error: any) {
      const errorMessage = handleGeolocationError(error);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkPosition();
  }, []);

  return {
    loading,
    weatherData,
    currentLocation,
    displayLocation,
    weatherImg,
    menuSelection,
    error,
    handleInput,
    handleLocation,
    setMenuSelection,
  };
};

export default useWeather;
