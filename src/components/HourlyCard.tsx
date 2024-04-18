import { ReactElement } from 'react';

interface CardProps {
  time: Date | Date[] | undefined;
  temp: intType;
  prob: intType;
  wind: intType;
}

type intType = Float32Array | undefined | number | string;

const HourlyCard = ({ time, temp, prob, wind }: CardProps): ReactElement => {
  // Funzione per formattare la data
  const formatTime = (date: Date): string => {
    return date.toLocaleString(); 
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-4 w-2/3 h-full text-gray-800 text-center gap-2">
      {/* Se 'time' è definito, renderizza la data */}
      {time && (
        <>
          {/* Se 'time' è un array, mappa ogni data */}
          {Array.isArray(time) ? (
            time.map((date, index) => (
              <h1 key={index}>{formatTime(date)}</h1>
            ))
          ) : (
            // Se 'time' è una singola data, visualizzala direttamente
            <h1>{formatTime(time)}</h1>
          )}
        </>
      )}
      <p>{temp}</p>
      <p>{prob}</p>
      <p>{wind}</p>
    </div>
  );
};

export default HourlyCard;
