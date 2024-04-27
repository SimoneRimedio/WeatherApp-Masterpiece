import { ReactElement } from 'react';
import Slider from "react-slick";
import { WeatherDataType } from '../types/types';

import imagesData from '../../public/images.json';

const images: Images = imagesData;
type Images = { [key: number]: string };

interface DailyCardProps {
  data: WeatherDataType;
}

const DailyCard = ({ data }: DailyCardProps): ReactElement => {
  const time = Array.isArray(data.time) && data.time.length > 0 ? data.time : null;
  const temp_min = data.temperature2mMin ?? null;
  const temp_max = data.temperature2mMax ?? null;
  const prob_max = data.precipitationProbabilityMax ?? null;
  const weather_code = data.weatherCode ?? null;

  const series: JSX.Element[] = [];

  if (weather_code instanceof Float32Array) {
    for (let i: number = 0; i < 7; i++) {
      const seriesDiv = (
        <div key={i} className='carousel-item bg-bgk rounded-lg text-black border-2 border-tools p-4 w-52 h-54 text-center'>
          <h1 className='font-black'>{String(time && time[i]).substring(0,3)}</h1>
          <img className="mx-auto" alt='weatherImage' src={images[weather_code[i]]}></img>
          <label>Temperature:</label>
          <p>{parseInt(String(temp_min && temp_min[i]))}° / {parseInt(String(temp_max && temp_max[i]))}°</p>
          <label>Precipitation:</label>
          <p>{parseInt(String(prob_max && prob_max[i]))} %</p>
        </div>
      );
      series.push(seriesDiv);
    }
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
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ],
    appendDots: (dots: boolean) => (
      <div
        style={{
          position: 'relative',
          bottom: '10px', 
          marginTop: '50px'
        }}
      >
        <ul className="slick-dots">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button>
        &#9679;
      </button>
    )
  };

  return (
    <div className="mx-auto w-3/4">
      <h1 className='text-4xl font-extrabold mb-10 mt-20 font-Poppins text-text-header'>Week Weather</h1>
      <Slider {...settings}>     
        {series}
      </Slider> 
    </div>
  );
};

export default DailyCard;
