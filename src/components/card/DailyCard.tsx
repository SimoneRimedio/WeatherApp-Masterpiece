import { ReactElement } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
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

  const series: JSX.Element[] = [];

  if (weather_code instanceof Float32Array) {
    for (let i: number = 0; i < 7; i++) {
      const seriesDiv = (
        <div
          key={i}
          className="carousel-item bg-card rounded-lg text-black border-2 border-tools p-4 w-52 h-54 text-center"
        >
          <h1 className="font-bold text-xl font-Poppins">
            {String(time && time[i]).substring(0, 3)}
          </h1>
          <img
            className="mx-auto"
            alt="weatherImage"
            src={images[weather_code[i]]}
          ></img>
          <label>Temperature:</label>
          <p className="font-Poppins font-semibold text-md">
            {parseInt(String(temp_min && temp_min[i]))}° /{" "}
            {parseInt(String(temp_max && temp_max[i]))}°
          </p>
          <label>Precipitation:</label>
          <p>{parseInt(String(prob_max && prob_max[i]))} %</p>
        </div>
      );
      series.push(seriesDiv);
    }
  }

  const settings = {
    className: "slick-slider-custom",
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    adaptiveHeight: true,
    slidesPerRow: 1,
    variableWidth: true,
  };

  return (
    <div className="mx-auto w-3/4">
      <style>{`
        .slick-slider-custom .slick-slide {
          margin-right: 5px; 
        }
      `}</style>
      <h1 className="text-4xl font-bold mb-10 mt-20 font-Poppins text-titles">
        Week Weather
      </h1>
      <Slider {...settings}>{series}</Slider>
    </div>
  );
};

export default DailyCard;
