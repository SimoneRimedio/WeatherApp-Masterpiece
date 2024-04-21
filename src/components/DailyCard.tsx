import { ReactElement } from 'react';
import { WeatherDataType } from '../types/types'; 

interface DailyCardProps {
  data: WeatherDataType;
}

const DailyCard = ({ data }: DailyCardProps): ReactElement => {
  const time = Array.isArray(data.time) && data.time.length > 0 ? data.time : null;
  const temp_min = data.temperature2mMin ?? null;
  const temp_max = data.temperature2mMax ?? null;
  const prob_max = data.precipitationProbabilityMax ?? null;

  const series: JSX.Element[] = [];

  for (let i = 0; i < 7; i++) {
    const seriesDiv = (
      <div key={i} className='bg-white rounded-lg shadow-md p-4 w-52 h-32'>
        <h1 className='font-black '>{String(time && time[i]).substring(0,3)}</h1>
        <p>Temperature: {parseInt(String(temp_min && temp_min[i]))}° / {parseInt(String(temp_max && temp_max[i]))}°</p>
        <p>Precipitation: {parseInt(String(prob_max && prob_max[i]))} %</p>
      </div>
    );
    series.push(seriesDiv);
  };

  return (
    <div className="flex justify-center content-center mt-10 flex-wrap gap-2">
      {series}
    </div>
  );
};

export default DailyCard;
