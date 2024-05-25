import { ReactElement, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { WeatherDataType } from "../../types/types";
import moment from "moment-timezone";

interface HourlyCardProps {
  data: WeatherDataType;
  timezone: WeatherDataType;
}

const HourlyCard = ({ data, timezone }: HourlyCardProps): ReactElement => {
  const temp: number[] = (data.temperature2m as unknown as number[]) ?? [];
  const prob: number[] = (data.precipitationProbability as unknown as number[]) ?? [];
  const wind: number[] = (data.windSpeed10m as unknown as number[]) ?? [];

  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    const currentHour = moment.tz(timezone.toString()).hour();
    console.log(timezone.toString(), currentHour);

    setNow(currentHour);
  }, [timezone]);

  const series: JSX.Element[] = [];

  for (let i = now; series.length < 24; i++) {
    const index = i % 24;
    const seriesDiv = (
      <div
        key={i}
        className="carousel-item flex flex-col bg-card rounded-lg shadow-md shadow-card-shadow text-text border-2 border-tools p-4 w-52 h-38 text-center flex-shrink-0"
      >
        <h1 className="font-bold text-xl mt-2">{index}:00</h1>
        <p className="mt-2">{parseInt(String(temp[i])) + "° C"}</p>
        <p>{parseInt(String(prob[index])) + " %"}</p>
        <p>{parseInt(String(wind[index])) + " Km/h"}</p>
      </div>
    );
    series.push(seriesDiv);
  }

  const settings = {
    className: "slick-slider-custom",
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    adaptiveHeight: true,
    slidesPerRow: 1,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
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
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
    appendDots: (dots: boolean) => (
      <div
        style={{
          position: "relative",
          bottom: "10px",
          marginTop: "50px",
          color: "white",
        }}
      >
        <ul className="slick-dots">{dots}</ul>
      </div>
    ),
    customPaging: () => <button>&#9679;</button>,
  };

  return (
    <div className="mx-auto w-3/4">
      <style>{`
        .slick-slider-custom .slick-slide {
        width: 200px; /* Imposta la larghezza fissa */
        margin-right: 5px;
        padding: 5px;
        }
    `}</style>
      <h1 className="text-4xl font-extrabold mt-20 font-Poppins text-titles">
        24h Weather
      </h1>
      <Slider {...settings}>{series}</Slider>
    </div>
  );
};

export default HourlyCard;
