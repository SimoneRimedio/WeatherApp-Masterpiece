import { ReactElement } from 'react';
import { WeatherDataType } from '../types/types'; 

interface HourlyCardProps {
  data: WeatherDataType;
}

const HourlyCard = ({ data }: HourlyCardProps): ReactElement => {
  const temp = data.temperature2m ?? [];
  const prob = data.precipitationProbability ?? [];
  const wind = data.windSpeed10m ?? [];

  const series: JSX.Element[] = [];

  const date = new Date();
  const now = date.getHours();
  console.log(now);

  for (let i = now; series.length < 24; i++) {
    const index = i % 24; // Calcola l'indice dell'array delle previsioni
    const seriesDiv = (
      <div key={index} className='bg-white rounded-lg shadow-md p-4 w-48 text-black'>
        <h1>{index}:00</h1>
        <p>Temperature: {parseInt(String(temp[index]))}° C</p>
        <p>Precipitation Probability: {parseInt(String(prob[index]))} %</p>
        <p>Wind: {parseInt(String(wind[index]))} Km/h</p>
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
