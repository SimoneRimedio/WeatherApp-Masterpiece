import { ReactElement, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { GetWeatherProps, WeatherData } from './types/types';
import { Tokens } from './utils/env';
import useFetch from './hooks/useFetch';
import weatherApi from './utils/weatherApi';
import Card from './components/Card';
import data from '../public/weather.json';
import { IconSearch } from '@tabler/icons-react';
import cardinalConv from './utils/cardinalConversion';

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
  <header></header>
    <form className='flex items-center' onSubmit={handleLocation}>
      <input 
        type='text' 
        className='py-2 px-3 w-64 border rounded-lg border-stone-700 text-gray-600' 
        placeholder="Enter location..."
        value={currentLocation} 
        onChange={handleInput} 
      />
      <button type="submit" className="ml-2"><IconSearch /></button>
    </form>
    <div className="flex justify-center items-center mt-10">
      <img src={weatherJSON?.image} alt="weatherIcon" className="w-30 h-30 mr-2" />
      <h1 className="text-xl">{weatherJSON?.description}</h1>
    </div>
    <div className="flex justify-center mt-10 space-x-4 text-center">
      <Card title="Temperature" content={`${parseInt(String(weatherData?.current.temperature2m))} °C`}></Card>
      <Card title="Humidity" content={`${parseInt(String(weatherData?.current.relativeHumidity2m))} %`}></Card>
      <Card title="Apparent Temperature" content={`${parseInt(String(weatherData?.current.apparentTemperature))} °C`}></Card>
      <Card title="Pressure" content={`${parseInt(String(weatherData?.current.surfacePressure))} mbar`}></Card>
      <Card title="Wind Direction" content={cardinalConv(weatherData?.current.windDirection10m ?? 0)}></Card>
      <Card title="Wind Speed" content={`${parseInt(String(weatherData?.current.windSpeed10m))} Km/h`}></Card>
    </div>
    <footer></footer>
  </>
  );
};

export default App;
