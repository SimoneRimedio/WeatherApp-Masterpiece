import { ReactElement } from 'react';

interface CardProps {
 time: string[] | undefined;
 tempMax: string;
 tempMin: string;
 probMax: string;
}

const DailyCard = ({time}: CardProps): ReactElement => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 w-48">
        {time && time.map((dateString, index) => (
            <h1 key={index}>{dateString.substring(0, 3)}</h1>
        ))}
      </div>
    );
  };
  
  export default DailyCard;
  