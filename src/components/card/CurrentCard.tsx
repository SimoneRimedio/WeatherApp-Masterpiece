import { ReactElement } from "react";
import { WeatherDataType } from "../../types/types";
import cardinalConv from "../../utils/cardinalConversion";
import { IconTemperature, IconDroplet, IconThermometer, IconArrowDownToArc, IconWind, IconWindsock } from "@tabler/icons-react";

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
  "Apparent Temperature": <IconThermometer />,
  Pressure: <IconArrowDownToArc />,
  "Wind Speed": <IconWind />,
  "Wind Direction": <IconWindsock />,
};

const unitLabels: UnitLabels = {
  Temperature: "° C",
  Humidity: "%",
  "Apparent Temperature": "° C",
  Pressure: "mbar",
  "Wind Speed": "Km/h",
  "Wind Direction": "",
};

const CurrentCard = ({ data }: CurrentCardProps): ReactElement => {
  const dataMap: { [key: string]: any } = {
    Temperature: data.temperature2m,
    Humidity: data.relativeHumidity2m,
    "Apparent Temperature": data.apparentTemperature,
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
      <div key={index} className="bg-card rounded-lg shadow-lg shadow-card-shadow p-4 w-48 h-32 text-center text-text">
        <p className="text-md mb-2 ">
          {icons}
          {key}
        </p>
        <h1 className="text-lg font-bold">
          {displayValue} {label}
        </h1>
      </div>
    );
  });

  return (
    <div className="flex justify-center content-center mt-10 flex-wrap gap-2">
      {series}
    </div>
  );
};

export default CurrentCard;
