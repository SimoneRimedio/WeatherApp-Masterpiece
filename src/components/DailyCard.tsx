import { ReactElement } from 'react';
import { WeatherDataType } from '../types/types'; 

interface DailyCardProps {
  data: WeatherDataType;
}

const DailyCard = ({ data }: DailyCardProps): ReactElement => {
  const time = Array.isArray(data.time) && data.time.length > 0 ? data.time : null;
  const tMin = data.temperature2mMin ?? null;
  const tMax = data.temperature2mMax ?? null;
  const probMax = data.precipitationProbabilityMax ?? null;

  const series: JSX.Element[] = [];

  for (let i = 0; i < 7; i++) {
    const seriesDiv = (
      <div key={i} className='bg-white rounded-lg shadow-md p-4 w-48 text-black'>
        <h1>{String(time && time[i]).substring(0,3)}</h1>
        <p>Temperature: {parseInt(String(tMin && tMin[i]))}°/ {parseInt(String(tMax && tMax[i]))}°</p>
        <p>Precipitation Probability: {parseInt(String(probMax && probMax[i]))} %</p>
      </div>
    );
    series.push(seriesDiv);
  }


  return (
    <div className="flex justify-center mt-10 space-x-4 text-center">
      {series}
    </div>
  );
};

export default DailyCard;
