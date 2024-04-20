import { fetchWeatherApi } from 'openmeteo';
import { GetWeatherProps, WeatherData } from '../types/types';

const weatherApi = async ({ latitude, longitude }: GetWeatherProps): Promise<WeatherData> => {
  const params = {
    'latitude': latitude,
    'longitude': longitude,
    'timezone': 'auto',
    'current': ['temperature_2m', 'relative_humidity_2m', 'apparent_temperature', 'precipitation', 'rain', 'showers', 'snowfall', 'weather_code', 'cloud_cover', 'surface_pressure', 'wind_speed_10m', 'wind_direction_10m',"is_day"],
    'hourly': ['temperature_2m', 'precipitation_probability', 'precipitation', 'wind_speed_10m'],
    'daily': ['temperature_2m_max', 'temperature_2m_min', 'precipitation_probability_max'],
  };
  
  const responses = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params);
  
  const current = responses[0].current()!;
  const hourly = responses[0].hourly()!;
  const daily = responses[0].daily()!;
  
  const range = (start: number, stop: number, step: number) => {
    return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
  };
  
  const weatherData: WeatherData = {
    current: {
      time: new Date((Number(current.time())) * 1000),
      temperature2m: current.variables(0)!.value(),
      relativeHumidity2m: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value(),
      precipitation: current.variables(3)!.value(),
      rain: current.variables(4)!.value(),
      showers: current.variables(5)!.value(),
      snowfall: current.variables(6)!.value(),
      weatherCode: current.variables(7)!.value(),
      cloudCover: current.variables(8)!.value(),
      surfacePressure: current.variables(9)!.value(),
      windSpeed10m: current.variables(10)!.value(),
      windDirection10m: current.variables(11)!.value(),
      isDay: current.variables(0)!.value(),
      keys: undefined
    },

    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map((t) => new Date(t * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
      precipitationProbability: hourly.variables(1)!.valuesArray()!,
      precipitation: hourly.variables(2)!.valuesArray()!,
      windSpeed10m: hourly.variables(3)!.valuesArray()!,
      keys: undefined
    },

    daily: {
      time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map((t) => new Date(t * 1000)),
      temperature2mMax: daily.variables(0)!.valuesArray()!,
      temperature2mMin: daily.variables(1)!.valuesArray()!,
      precipitationProbabilityMax: daily.variables(2)!.valuesArray()!,
      keys: undefined
    },
  };
  
  return weatherData;
};

export default weatherApi;
