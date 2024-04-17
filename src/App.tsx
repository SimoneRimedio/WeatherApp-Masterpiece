import { ReactElement, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { GetWeatherProps, WeatherData } from './types/types';
import { Tokens } from './utils/env';
import useFetch from './hooks/useFetch';
import weatherApi from './utils/weatherApi';
import Card from './components/Card';
import data from '../public/weather.json';

interface WeatherJSONProps {
  description: string;
  image: string;
}

interface WeatherDataJSON {
  [key: string]: {
    day: WeatherJSONProps;
    night: WeatherJSONProps;
  };
}

type Location = string;

const App = (): ReactElement => {
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [currentLocation, setCurrentLocation] = useState<Location>('');
  const [weatherJSON, setWeatherJSON] = useState<WeatherJSONProps>();

  const getWeatherData = async ({ latitude, longitude }: GetWeatherProps): Promise<void> => {
    const weatherData = await weatherApi({ latitude: latitude, longitude: longitude });
    setWeatherData(weatherData);

    const code = weatherData.current.weatherCode ?? '0'; 
    const currentWeather = (data as WeatherDataJSON)[code];
    setWeatherJSON({ description: currentWeather.day.description || currentWeather.night.description || '', image: currentWeather.day.image || currentWeather.night.image || '' });
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentLocation(event.target.value);
  };

  const handleLocation = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const pos = await useFetch({ url: `https://geocode.maps.co/search?q=${currentLocation}&api_key=${Tokens.GeocodeToken}` });
    await getWeatherData({ latitude: pos.data[0].lat, longitude: pos.data[0].lon });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        const getPosition = await useFetch({ url: `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${Tokens.GeocodeToken}` });
        setCurrentLocation(getPosition.data.address.county);
        await getWeatherData({ latitude: latitude, longitude: longitude });
      });
    }
  }, []);

  return (
    <>
    <form className='flex max-w-md px-4 mx-auto mt-12' onSubmit={handleLocation}>
      <input type='text' className='w-60 p-3 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600' value={currentLocation} onChange={handleInput} /> 
      <button type='submit' className='border-1 border-gray-600 rounded-md relative'>
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
    <div className="flex justify-center items-center mt-10">
      <img src={weatherJSON?.image} alt='weatherIcon'/>
      <h1>{weatherJSON?.description}</h1>
    </div>
    <div className="flex justify-center mt-10">
      {weatherData && <Card elements={weatherData.current}></Card>}
    </div>
    </>
  );
};

export default App;
