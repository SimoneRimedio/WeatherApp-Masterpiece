import { ReactElement } from 'react';
import { WeatherDataType } from '../types/types'; 

interface HourlyCardProps {
  data: WeatherDataType;
}

const HourlyCard = ({ data }: HourlyCardProps): ReactElement => {
  const temp = data.temperature2m ?? null;
  const prob = data.precipitationProbability ?? null;
  const wind = data.windSpeed10m ?? null;

  const series: JSX.Element[] = [];

  const date = new Date;
  const now = date.getHours();
  console.log(now);

  for (let i = now; i < 24; i++) {
    const seriesDiv = (
      <div key={i} className='bg-white rounded-lg shadow-md p-4 w-48 text-black'>
        <h1>{i}</h1>
        <p>Temperature: {parseInt(String(temp && temp[i]))}° C</p>
        <p>Precipitation Probability: {parseInt(String(prob && prob[i]))} %</p>
        <p>Wind: {parseInt(String(wind && wind[i]))} Km/h</p>
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

export default HourlyCard;
