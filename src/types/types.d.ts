export interface GetWeatherProps {
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  current: WeatherDataType;
  hourly: WeatherDataType;
  daily: WeatherDataType;
  timezone: string | undefined;
}

export type WeatherDataType = {
  map(arg0: (data: any, index: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  keys: any;
  time: Date | Date[] | string[];
  temperature2m?: Float32Array | number;
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
  weatherCode?: number | Float32Array;
  cloudCover?: number;
  surfacePressure?: number;
  windSpeed10m?: Float32Array | number;
  windDirection10m?: number;
  isDay?: number;
};

export interface WeatherImgProps {
  description: string;
  image: string;
}

export interface WeatherDataImg {
  [key: string]: {
    day: WeatherImgProps;
    night: WeatherImgProps;
  };
}


