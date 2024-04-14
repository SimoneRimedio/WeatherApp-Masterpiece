import { ReactElement } from 'react';

interface CardProps<T> {
  elements: T | undefined;
}

const Card = <T,>({ elements }: CardProps<T>): ReactElement => {
  return (
    <div>
      {elements && (
        <div>
          {Object.entries(elements).map(([key, value], index) => (
            <div key={index}>
              <div>{key}: {String(value)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
