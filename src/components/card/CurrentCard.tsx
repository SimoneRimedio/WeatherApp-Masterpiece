import { ReactElement } from "react";
import { WeatherDataType } from "../../types/types";
import cardinalConv from "../../utils/cardinalConversion";
import {
  IconTemperature,
  IconDroplet,
  IconThermometer,
  IconArrowDownToArc,
  IconWind,
  IconWindsock,
} from "@tabler/icons-react";

interface CurrentCardProps {
  data: WeatherDataType;
}

interface UnitLabels {
  [key: string]: string;
}

interface IconsLabels {
  [key: string]: JSX.Element;
}

const IconsLabels: IconsLabels = {
  Temperature: <IconTemperature />,
  Humidity: <IconDroplet />,
  "Apparent T.": <IconThermometer />,
  Pressure: <IconArrowDownToArc />,
  "Wind Speed": <IconWind />,
  "Wind Direction": <IconWindsock />,
};

const unitLabels: UnitLabels = {
  Temperature: "° C",
  Humidity: "%",
  "Apparent T.": "° C",
  Pressure: "mbar",
  "Wind Speed": "Km/h",
  "Wind Direction": "",
};

const CurrentCard = ({ data }: CurrentCardProps): ReactElement => {
  const dataMap: { [key: string]: any } = {
    Temperature: data.temperature2m,
    Humidity: data.relativeHumidity2m,
    "Apparent T.": data.apparentTemperature,
    Pressure: data.surfacePressure,
    "Wind Speed": data.windSpeed10m,
    "Wind Direction": data.windDirection10m,
  };

  const series = Object.keys(dataMap).map((key, index) => {
    const value = dataMap[key];
    const label = unitLabels[key];
    const icons = IconsLabels[key];
    const displayValue =
      key === "Wind Direction" ? cardinalConv(value) : parseInt(value);

    return (
      <div
        key={index}
        className="bg-card rounded-lg shadow-sm shadow-card-shadow text-center text-text w-36 h-36 flex flex-col"
      >
        <div className="self-start p-2">{icons}</div>
        <div className="flex flex-col justify-center items-center m-1 p-1">
          <p className="text-md font-light font-Poppins">{key}</p>
          <h1 className="text-lg font-semibold font-Poppins">
            {displayValue} {label}
          </h1>
        </div>
      </div>
    );
  });

  return (
    <div className="flex justify-center content-center mt-10 flex-wrap gap-3">
      {series}
    </div>
  );
};

export default CurrentCard;
