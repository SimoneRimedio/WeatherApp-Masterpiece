import { ReactElement, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WeatherDataType } from "../../types/types";
import moment from "moment-timezone";
import "../../index.css";

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
      <div
        key={i}
        className="carousel-item flex flex-col bg-card rounded-lg shadow-md shadow-card-shadow text-text p-4 w-52 h-38 text-center"
      >
        <h1 className="font-bold font-Poppins text-xl mt-2">{index}:00</h1>
        <p className="mt-2 font-Poppins font-medium">
          {parseInt(String(temp[index])) + "° C"}
        </p>
        <p>{parseInt(String(prob[index])) + " %"}</p>
        <p>{parseInt(String(wind[index])) + " Km/h"}</p>
      </div>
    );
  });

  return (
    <div className="mx-auto w-3/4">
      <h1 className="text-3xl font-bold my-20 font-Poppins text-titles">
        24h Weather
      </h1>
      <div>{series}</div>
    </div>
  );
};

export default HourlyCard;
