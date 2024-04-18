import { ReactElement } from 'react';

interface CardProps {
  title: string;
  content: string | number | undefined;
}

const Card = ({ title, content }: CardProps): ReactElement => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-48">
        <p className="text-sm mb-2 text-black">{title}</p>
        <h1 className="text-md text-gray-600 font-bold">{content}</h1>
    </div>
  );
};

export default Card;
