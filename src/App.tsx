import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  ReactElement,
} from "react";
import { WeatherData, WeatherDataJSON, WeatherJSONProps } from "./types/types";
import { Tokens } from "./utils/env";
import useFetch from "./hooks/useFetch";
import data from "./assets/weather.json";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Menu from "./components/layout/Menu.tsx";
import InputForm from "./components/layout/InputForm.tsx";

import DailyCard from "./components/card/DailyCard";
import HourlyCard from "./components/card/HourlyCard";
import WeatherCards from "./components/card/WeatherCards";

import { getWeatherData } from "./utils/getWeatherData";
import { updateWeatherJSON } from "./utils/getImageJSON";
import { fetchWeatherByGeolocation } from "./utils/fetchWeatherByGeolocation";
import Loading from "./common/Loader/Loading.tsx";
import Alert from "@mui/material/Alert";

const App = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [displayLocation, setDisplayLocation] = useState<string>("");
  const [weatherJSON, setWeatherJSON] = useState<WeatherJSONProps>({
    description: "",
    image: "",
  });
  const [menuSelection, setMenuSelection] = useState<string>("current");
  const [error, setError] = useState<string | null>(null);

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentLocation(event.target.value);
  };

  const handleLocation = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const pos = await useFetch({
      url: `https://geocode.maps.co/search?q=${currentLocation}&api_key=${Tokens.GeocodeToken}`,
    });

    const weatherData = await getWeatherData({
      latitude: pos.data[0]?.lat || 0,
      longitude: pos.data[0]?.lon || 0,
    });
    setWeatherData(weatherData);
    setWeatherJSON(updateWeatherJSON(weatherData, data as WeatherDataJSON));
    setDisplayLocation(pos.data[0].display_name);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    try {
      fetchWeatherByGeolocation({
        setCurrentLocation,
        setWeatherData,
        setWeatherJSON,
        data,
        setError,
      });
    } catch (err) {
      setError(
        "Error retrieving location. Make sure you have enabled geolocation in your browser."
      );
    }
  }, []);

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white font-sans">
        <Header menuSelection={""} setMenuSelection={function (selection: string): void {
          throw new Error("Function not implemented.");
        } }></Header>
        <div className="ml-64 p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-4">
                <svg
                  className="h-4 w-4 inline-block mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* ... bell icon svg ... */}
                </svg>
              </button>
              <div className="flex items-center">
                <img
                  src="/profile-pic.jpg"
                  alt="Profile Picture"
                  className="h-8 w-8 rounded-full mr-2"
                />
                <span className="text-gray-400">Daniel Smith</span>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          {loading ? (
            <Loading />
          ) : (
            <main className="flex flex-col items-center w-full">
              <InputForm
                currentLocation={currentLocation}
                handleInput={handleInput}
                handleLocation={handleLocation}
              />
              <div className="mt-8">
                <Menu
                  menuSelection={menuSelection}
                  setMenuSelection={setMenuSelection}
                />
              </div>
              {menuSelection === "current" && (
                <WeatherCards
                  displayLocation={displayLocation}
                  weatherJSON={weatherJSON}
                  weatherData={weatherData?.current}
                />
              )}
              {menuSelection === "hourly" && weatherData && (
                <HourlyCard data={weatherData.hourly}></HourlyCard>
              )}
              {menuSelection === "daily" && weatherData && (
                <DailyCard data={weatherData.daily}></DailyCard>
              )}
            </main>
          )}

          {/* Altri contenuti delle schede */}
          {/* ... */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
