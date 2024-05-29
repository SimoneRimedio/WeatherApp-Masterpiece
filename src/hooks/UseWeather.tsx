import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { WeatherData, WeatherDataImg, WeatherImgProps } from "../types/types";
import { getGeocode, getReverseGeocode } from "../services/geocodeApi";
import getWeatherData from "../services/weatherApi";
import data from "../assets/weather.json";

const useWeather = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [displayLocation, setDisplayLocation] = useState<string>("");
  const [weatherImg, setWeatherImg] = useState<WeatherImgProps>({
    description: "",
    image: "",
  });
  const [menuSelection, setMenuSelection] = useState<string>("current");
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(true);
  const [positionActive, setPositionActive] = useState<boolean>(false);
  const [fetchFlag, setFetchFlag] = useState<boolean>(false);

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentLocation(event.target.value);
  };

  const handleLocation = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(null);
    try {
      const pos = await getGeocode(currentLocation);
      if (pos.data && pos.data.length > 0) {
        const weatherData = await getWeatherData({
          latitude: pos.data[0]?.lat || 0,
          longitude: pos.data[0]?.lon || 0,
        });
        setWeatherData(weatherData);
        setWeatherImg(updateWeatherImg(weatherData, data as WeatherDataImg));
        setDisplayLocation(pos.data[0].display_name);
      } else {
        throw new Error("Location not found");
      }
    } catch (err) {
      setError("Location Searching Error"+err);
    }
  };

  const getGeolocation = (): Promise<GeolocationPosition> => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const updateWeatherImg = (
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

  useEffect(() => {
  const checkPosition = async () => {
    try {
      const pos = await getGeolocation();
      setShowModal(false);
      setLoading(true);

      const { latitude, longitude } = pos.coords;
      const reverseGeocodeResponse = await getReverseGeocode(latitude, longitude);
      const weatherData = await getWeatherData({ latitude, longitude });

      setCurrentLocation(reverseGeocodeResponse.data.address.town);
      setWeatherData(weatherData);
      setWeatherImg(updateWeatherImg(weatherData, data as WeatherDataImg));
      setPositionActive(true);
    } catch (error: any) {
      if (error.code === error.PERMISSION_DENIED) {
        setShowModal(true);
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        console.log("Location information is unavailable.");
      } else if (error.code === error.TIMEOUT) {
        console.log("The request to get user location timed out.");
      } else {
        console.log("An unknown error occurred.");
      }
      setPositionActive(false);
    } finally {
      setLoading(false);
    }
  };

  if(!fetchFlag)
  {
    setFetchFlag(true);
    checkPosition();
  }
 

  let interval: NodeJS.Timeout;
  if (error) {
    interval = setInterval(() => {
      window.location.reload();
    }, 10000);
  }
  return () => clearInterval(interval);
}, []);


  return {
    loading,
    weatherData,
    currentLocation,
    displayLocation,
    weatherImg,
    menuSelection,
    error,
    showModal,
    setShowModal,
    positionActive,
    handleInput,
    handleLocation,
    setMenuSelection,
  };
};

export default useWeather;
