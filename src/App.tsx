import { ReactElement, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { WeatherData, WeatherDataJSON, WeatherJSONProps} from './types/types';
import { Tokens } from './utils/env';
import useFetch from './hooks/useFetch';
import weatherApi from './utils/weatherApi';
import data from '../public/weather.json';
import { IconSearch } from '@tabler/icons-react';

import CurrentCard from './components/CurrentCard';
import DailyCard from './components/DailyCard';
import HourlyCard from './components/HourlyCard';

const App = (): ReactElement => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [weatherJSON, setWeatherJSON] = useState<WeatherJSONProps>({ description: '', image: '' });
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
        <button onClick={handleHourlyButtonClick} className="text-card bg-tools hover:bg-tools-shadow focus:outline-card font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-10">Show Hourly</button>
        <button onClick={handleDailyButtonClick} className="text-card bg-tools hover:bg-tools-shadow focus:outline-card font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-10">Show Daily</button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto flex flex-col justify-center items-center min-h-screen">
      <header className="text-center">
        <h1 className='font-extrabold mt-2 font-Poppins md:text-4xl lg:text-5xl text-4xl text-text-header'>Weather App</h1>
        <form onSubmit={handleLocation} className="flex items-center justify-center mt-10">
          <input 
            type='text' 
            className='py-2 px-3 w-full md:w-full border rounded-lg border-tools-shadow text-card bg-tools focus:outline-none focus:border-blue-500' 
            placeholder="Enter location..."
            value={currentLocation} 
            onChange={handleInput} 
          />
          <button type="submit" className="ml-2 p-2 bg-tools hover:bg-tools-shadow focus:outline-none focus:bg-gray-700 rounded-lg">
            <IconSearch className="text-card" />
          </button>
        </form>
      </header>

      {!showHourly && !showDaily && renderWeatherCards()}
      
      {showHourly && (
        <>
          <h1 className='text-4xl font-extrabold mt-20 font-Poppins text-text-header'>24h Weather</h1>
          <h3 className='text-2xl font-bold mt-5 mb-10 font-Poppins text-text-header'>(Not Local GMT)</h3>
          {weatherData && <HourlyCard data={weatherData.hourly}></HourlyCard>}
          <button onClick={() => setShowHourly(false)} className="text-card bg-tools hover:bg-tools-shadow focus:outline-card font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-10">Go Back</button>
        </>
      )}
      
      {showDaily && (
        <>
          <h1 className='text-4xl font-extrabold mb-10 mt-20 font-Poppins text-text-header'>Week Weather</h1>
          {weatherData && <DailyCard data={weatherData.daily}></DailyCard>}
          <button onClick={() => setShowDaily(false)} className="text-card bg-tools hover:bg-tools-shadow focus:outline-card font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-10">Go Back</button>
        </>
      )}

      <footer className='relative bottom-0 w-full text-center py-4 justify-center font-BebasNeue mt-10 font-extralight'>
        <p>Data provided by Open Meteo</p>
        <p>by Simone Rimedio</p>
      </footer>
    </div>
  );
};

export default App;
