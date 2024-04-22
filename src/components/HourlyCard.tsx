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
    const index = i % 24; // Calculate the index of the forecast array
    const seriesDiv = (
      <div key={i} className="bg-white rounded-lg shadow-lg p-4 w-48 h-32 text-center">
        <h1 className='font-black mt-2'>{index}:00</h1>
        <p className='mt-2'>{parseInt(String(temp[i]))}° C</p>
        <p className='mt-2'>{parseInt(String(prob[index]))} %</p>
        <p className='mt-2'>{parseInt(String(wind[index]))} Km/h</p>
      </div>
    );
    series.push(seriesDiv);
  }

  return (
    <div className="flex justify-center content-center mt-10 flex-wrap gap-2">
        {series}
    </div>
  );
};

export default HourlyCard;
