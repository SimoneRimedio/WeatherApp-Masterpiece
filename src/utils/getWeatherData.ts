import weatherApi from './weatherApi';
import { WeatherData } from '../types/types';

export const getWeatherData = async ({ latitude, longitude }: { latitude: number; longitude: number }): Promise<WeatherData> => {
    const weatherData = await weatherApi({ latitude, longitude });
    return weatherData;
  };
