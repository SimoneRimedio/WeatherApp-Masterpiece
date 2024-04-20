import { ReactElement } from 'react';
import { WeatherDataType } from '../types/types';
import cardinalConv from '../utils/cardinalConversion';

interface CurrentCardProps {
  data: WeatherDataType;
}

interface UnitLabels {
  [key: string]: string;
}

const unitLabels: UnitLabels = {
  'temperature': '° C',
  'humidity': '%',
  'pressure': 'mbar',
  'wind speed': 'Km/h',
  'wind direction': ''
};

const CurrentCard = ({ data }: CurrentCardProps): ReactElement => {
  const dataMap: { [key: string]: any } = {
    'temperature': data.temperature2m,
    'humidity': data.relativeHumidity2m,
    'apparent temperature': data.apparentTemperature,
    'pressure': data.surfacePressure,
    'wind speed': data.windSpeed10m,
    'wind direction': data.windDirection10m
  };

  const series = Object.keys(dataMap).map((key, index) => {
    const value = dataMap[key];
    const label = unitLabels[key];
    const displayValue =
      key === 'wind direction' ? cardinalConv(value) : parseInt(value);

    return (
      <div key={index} className='bg-white rounded-lg shadow-md p-4 w-48'>
        <p className='text-sm mb-2 text-black'>{key}</p>
        <h1 className='text-md text-gray-600 font-bold'>{displayValue} {label}</h1>
      </div>
    );
  });

  return (
    <div className='flex justify-center mt-10 space-x-4 text-center'>
      {series}
    </div>
  );
};

export default CurrentCard;
