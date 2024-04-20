import { ReactElement } from 'react';
import { WeatherDataType } from '../types/types';

interface HourlyCardProps {
  data: WeatherDataType;
}

const HourlyCard = ({ data }: HourlyCardProps): ReactElement => {
  const temp: number[] = data.temperature2m as unknown as number[] ?? [];
  const prob: number[] = data.precipitationProbability as unknown as number[] ?? [];
  const wind: number[] = data.windSpeed10m as unknown as number[] ?? [];  

  const series: JSX.Element[] = [];

  const date = new Date();
  const now = date.getHours();

  for (let i = now; series.length < 24; i++) {
    const index = i % 24; // Calcola l'indice dell'array delle previsioni
    const seriesDiv = (
      <div key={i} className='flex-grow border border-gray-300 rounded text-center py-8 w-16 h-16'>
        <h1>{index}:00</h1>
        <p className='font-bold'>{parseInt(String(temp[i]))}° C</p>
        <p>{parseInt(String(prob[index]))} %</p>
        <p>{parseInt(String(wind[index]))} Km/h</p>
      </div>
    );
    series.push(seriesDiv);
  }

  return (
    <div className="flex overflow-x-auto w-auto scrollbar-hide gap-4 mt-15 mb-20">
      {series}
    </div>
  );
};

export default HourlyCard;


