import { ReactElement, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { WeatherData, WeatherDataJSON } from './types/types';
import { Tokens } from './utils/env';
import useFetch from './hooks/useFetch';
import weatherApi from './utils/weatherApi';
import data from '../public/weather.json';
import { IconSearch } from '@tabler/icons-react';

import CurrentCard from './components/CurrentCard';
import DailyCard from './components/DailyCard';
import HourlyCard from './components/HourlyCard';

interface WeatherDescription {
  description: string;
  image: string;
}

const App = (): ReactElement => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [weatherJSON, setWeatherJSON] = useState<WeatherDescription>({ description: '', image: '' });
  const [showHourly, setShowHourly] = useState(false);
  const [showDaily, setShowDaily] = useState(false);

  const getWeatherData = async ({ latitude, longitude }: { latitude: number; longitude: number }): Promise<void> => {
    const weatherData = await weatherApi({ latitude, longitude });
    setWeatherData(weatherData);
    
    const code = weatherData.current.weatherCode; 
    const currentWeather = typeof code === 'number' ? (data as WeatherDataJSON)[code] : null;

    const isDay = weatherData.current.isDay;
    const description = isDay ? currentWeather?.day.description : currentWeather?.night.description;
    const image = isDay ? currentWeather?.day.image : currentWeather?.night.image;

    setWeatherJSON({ description: description ?? '', image: image ?? '' });
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentLocation(event.target.value);
  };

  const handleLocation = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const pos = await useFetch({ url: `https://geocode.maps.co/search?q=${currentLocation}&api_key=${Tokens.GeocodeToken}` });
    await getWeatherData({ latitude: pos.data[0]?.lat || 0, longitude: pos.data[0]?.lon || 0 });
  };

  useEffect(() => {
    const fetchWeatherByGeolocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords;

          const getPosition = await useFetch({ url: `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${Tokens.GeocodeToken}` });
          setCurrentLocation(getPosition.data.address.county);
          await getWeatherData({ latitude, longitude });
        });
      }
    };
    fetchWeatherByGeolocation();
  }, []);

  const handleHourlyButtonClick = () => {
    setShowHourly(true);
    setShowDaily(false);
  };

  const handleDailyButtonClick = () => {
    setShowHourly(false);
    setShowDaily(true);
  };

  const renderWeatherCards = () => (
    <div className="flex flex-col items-center mt-10">
      <img src={weatherJSON.image} alt="weatherIcon" className="w-30 h-30 mb-2" />
      <h1 className="text-xl text-center mb-4">{weatherJSON.description}</h1>
      {weatherData && <CurrentCard data={weatherData.current}></CurrentCard>}
      <div className="flex justify-center mt-10 rounded-md">
        <button onClick={handleHourlyButtonClick} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Show Hourly</button>
        <button onClick={handleDailyButtonClick} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Show Daily</button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto flex flex-col justify-center items-center min-h-screen">
      <header className="text-center">
        <h1 className='text-6xl font-extrabold mt-2 font-Poppins'>Weather App</h1>
        <form onSubmit={handleLocation} className="flex items-center justify-center mt-10">
          <input 
            type='text' 
            className='py-2 px-3 w-full md:w-auto border rounded-lg border-gray-700 text-gray-300 bg-gray-800 focus:outline-none focus:border-blue-500' 
            placeholder="Enter location..."
            value={currentLocation} 
            onChange={handleInput} 
          />
          <button type="submit" className="ml-2 p-2 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:bg-gray-600 rounded-lg">
            <IconSearch className="text-white" />
          </button>
        </form>
      </header>

      {!showHourly && !showDaily && renderWeatherCards()}
      
      {showHourly && (
        <div className="flex flex-col items-center mt-10">
          <h1 className='text-4xl font-extrabold mt-10 mb-10 font-Poppins'>Hourly Weather</h1>
          {weatherData && <HourlyCard data={weatherData.hourly}></HourlyCard>}
          <button onClick={() => setShowHourly(false)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-10">Go Back</button>
        </div>
      )}
      
      {showDaily && (
        <div className="flex flex-col items-center mt-10">
          <h1 className='text-4xl font-extrabold mb-10 mt-10 font-Poppins'>Week Weather</h1>
          {weatherData && <DailyCard data={weatherData.daily}></DailyCard>}
          <button onClick={() => setShowDaily(false)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-10">Go Back</button>
        </div>
      )}

      <footer className='relative bottom-0 w-full text-center py-4 justify-center font-BebasNeue mt-10 font-extralight'>
        <p>Data provided by Open Meteo</p>
        <p>by Simone Rimedio</p>
      </footer>
    </div>
  );
};

export default App;
