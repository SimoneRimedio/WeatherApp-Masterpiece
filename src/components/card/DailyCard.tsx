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
        <tr key={i} className="text-center">
          <td className="font-semibold text-l">
            {String(time && time[i]).substring(0, 3)}
          </td>
          <td className="flex justify-center">
            <img
              className="w-16 bg-opacity-10"
              alt="weatherImage"
              src={images[weather_code[i]]}
            ></img>
          </td>
          <td className="">
            <span className="font-bold text-l">
              {parseInt(String(temp_min && temp_min[i]))}°
            </span>
            /{" "}
            <span className="font-bold text-l">
              {parseInt(String(temp_max && temp_max[i]))}°
            </span>
          </td>
          <td className="">{parseInt(String(prob_max && prob_max[i]))} %</td>
        </tr>
      );
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold my-12 font-Poppins text-titles">
        Week Weather
      </h1>
      <div className="flex flex-col justify-center p-3 mx-4">
        <table className="table-fixed font-Poppins sm:text-xs md:text-xs">
          <thead className="text-center">
            <tr className="text-md font-bold text-titles">
              <th className="px-4 py-2">Day</th>
              <th className="px-4 py-2">Weather</th>
              <th className="px-4 py-2">Temperature</th>
              <th className="px-4 py-2">Precipitation</th>
            </tr>
          </thead>
          <tbody className="">{tableRows}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyCard;
