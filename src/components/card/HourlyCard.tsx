import { ReactElement } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WeatherDataType } from "../../types/types";

interface HourlyCardProps {
  data: WeatherDataType;
}

const HourlyCard = ({ data }: HourlyCardProps): ReactElement => {
  const temp: number[] = (data.temperature2m as unknown as number[]) ?? [];
  const prob: number[] =
    (data.precipitationProbability as unknown as number[]) ?? [];
  const wind: number[] = (data.windSpeed10m as unknown as number[]) ?? [];

  const date = new Date();
  const now = date.getHours();

  const series: JSX.Element[] = [];

  for (let i = now; series.length < 24; i++) {
    const index = i % 24; // Calculate the index of the forecast array
    const seriesDiv = (
      <div
        key={i}
        className="carousel-item bg-card rounded-lg shadow-md shadow-gray-500 text-text-card border-2 border-tools p-4 w-52 h-38 text-center"
      >
        <h1 className="font-black mt-2">{index}:00</h1>
        <p className="mt-2">{parseInt(String(temp[i])) + "° C"}</p>
        <p className="mt-2">{parseInt(String(prob[index])) + " %"}</p>
        <p className="mt-2">{parseInt(String(wind[index])) + " Km/h"}</p>
      </div>
    );
    series.push(seriesDiv);
  }

  const settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
    ],
    appendDots: (dots: boolean) => (
      <div
        style={{
          position: "relative",
          bottom: "10px",
          marginTop: "50px",
        }}
      >
        <ul className="slick-dots">{dots}</ul>
      </div>
    ),
    customPaging: () => <button>&#9679;</button>,
  };

  return (
    <div className="mx-auto w-3/4">
      <h1 className="text-4xl font-extrabold mt-20 font-Poppins text-text-header">
        24h Weather
      </h1>
      <h3 className="text-2xl font-bold mt-5 mb-10 font-Poppins text-text-header">
        (Not Local GMT)
      </h3>
      <Slider {...settings}>{series}</Slider>
    </div>
  );
};

export default HourlyCard;
