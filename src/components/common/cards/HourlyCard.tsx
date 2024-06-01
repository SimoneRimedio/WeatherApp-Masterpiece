import { ReactElement, useEffect, useState } from "react";
import { WeatherDataType } from "../../../types/types";
import moment from "moment-timezone";

interface HourlyCardProps {
  data: WeatherDataType;
  timezone: string | undefined;
}

const HourlyCard = ({ data, timezone }: HourlyCardProps): ReactElement => {
  const temp: number[] = (data.temperature2m as unknown as number[]) ?? [];
  const prob: number[] =
    (data.precipitationProbability as unknown as number[]) ?? [];
  const wind: number[] = (data.windSpeed10m as unknown as number[]) ?? [];

  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    const currentHour = moment.tz(String(timezone)).hour();
    setNow(currentHour);
  }, [timezone]);

  const series = Array.from({ length: 24 }, (_, i) => {
    const index = (now + i) % 24;
    return (
      <div key={i} className="flex flex-col h-36 px-6 py-3 text-center border bg-light text-dark rounded-md">
        <h1 className="font-bold font-Poppins text-sm mb-4">{index}:00</h1>
        <p className="text-md font-bold font-Poppins">{parseInt(String(temp[index])) + "° C"}</p>
        <p className="text-md font-medium font-Poppins">{parseInt(String(prob[index])) + " %"}</p>
        <p className="text-md font-medium font-Poppins">{parseInt(String(wind[index])) + " Km/h"}</p>
      </div>
    );
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold my-20 font-Poppins text-dark dark:text-light">
        24h Weather
      </h1>
      <div className="flex flex-row overflow-x-scroll scroll-smooth whitespace-nowrap snap-proximity w-96 h-44 gap-2">{series}</div>
    </div>
  );
};

export default HourlyCard;
