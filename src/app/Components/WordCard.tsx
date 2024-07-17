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
      className={`flex items-center justify-center md:text-[16px] text-[11px] h-[90px] w-[90px] sm:h-24 sm:w-24 md:h-32 md:w-32 bg-zinc-500 text-black font-bold rounded shadow-md transition-colors duration-500 md:hover:bg-amber-500 cursor-pointer ${
        isSelected ? 'bg-emerald-800' : ''
      }`}
    >
      {word}
    </div>
  );
};

export default WordCard;
