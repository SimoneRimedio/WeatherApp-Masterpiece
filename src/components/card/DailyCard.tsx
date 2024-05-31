import { ReactElement } from "react";
import { WeatherDataType } from "../../types/types";
import imagesData from "../../assets/images.json";

const images: Images = imagesData;
type Images = { [key: number]: string };

interface DailyCardProps {
  data: WeatherDataType;
}

const DailyCard = ({ data }: DailyCardProps): ReactElement => {
  const time =
    Array.isArray(data.time) && data.time.length > 0 ? data.time : null;
  const temp_min = data.temperature2mMin ?? null;
  const temp_max = data.temperature2mMax ?? null;
  const prob_max = data.precipitationProbabilityMax ?? null;
  const weather_code = data.weatherCode ?? null;

  const tableRows: JSX.Element[] = [];

  if (weather_code instanceof Float32Array) {
    for (let i: number = 0; i < 7; i++) {
      tableRows.push(
        <tr key={i} className="text-titles text-center">
          <td className="text-lg font-bold px-4 py-2 md:px-6 md:py-4">
            {String(time && time[i]).substring(0, 3)}
          </td>
          <td className="px-4 py-2 md:px-6 md:py-4">
            <img
              className="w-16 bg-opacity-10"
              alt="weatherImage"
              src={images[weather_code[i]]}
            ></img>
          </td>
          <td className="mx-auto px-4 py-2 md:px-6 md:py-4">
            <span className="text-lg font-bold">
              {parseInt(String(temp_min && temp_min[i]))}°
            </span>
            /{" "}
            <span className="text-lg font-bold">
              {parseInt(String(temp_max && temp_max[i]))}°
            </span>
          </td>
          <td className="mx-auto text-md px-4 py-2">
            {parseInt(String(prob_max && prob_max[i]))} %
          </td>
        </tr>
      );
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold my-12 font-Poppins text-titles">
        Week Weather
      </h1>
      <div className="overflow-y-auto h-2/3">
        <table className="table-auto lg:w-full md:w-2/3 sm:w-2/3 sm:text-sm md:text-xs">
          <thead>
            <tr className="text-md font-bold font-Poppins text-titles">
              <th className="px-4 py-2">Day</th>
              <th className="px-4 py-2">Weather</th>
              <th className="px-4 py-2">Temperature</th>
              <th className="px-4 py-2">Precipitation</th>
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyCard;
