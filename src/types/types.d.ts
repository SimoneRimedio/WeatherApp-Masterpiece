export interface GetWeatherProps {
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  current: WeatherDataType;
  hourly: WeatherDataType;
  daily: WeatherDataType;
}

export type WeatherDataType = {
  time: Date | Date[] | string[];
  temperature2m?: Float32Array;
  temperature2mMin?: Float32Array;
  temperature2mMax?: Float32Array;
  relativeHumidity2m?: number;
  apparentTemperature?: number;
  precipitation?: number | Float32Array;
  precipitationProbability?: Float32Array;
  precipitationProbabilityMax?: Float32Array;
  rain?: number;
  showers?: number;
  snowfall?: number;
  weatherCode?: number;
  cloudCover?: number;
  surfacePressure?: number;
  windSpeed10m?: Float32Array;
  windDirection10m?: number;
  isDay?: number;
}
