import React from 'react';

interface WordCardProps {
  word: string;
  isSelected: boolean;
  onClick: () => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center md:text-[16px] text-[10px] h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 bg-gray-200 text-black font-bold rounded shadow-md hover:bg-gray-300 cursor-pointer ${
        isSelected ? 'bg-gray-400' : ''
      }`}
    >
      {word}
    </div>
  );
};

export default WordCard;
