"use client"
import React, { useState, useEffect } from 'react';
import WordCard from './WordCard';

// Function to shuffle an array
function shuffleArray(array: string[]): string[] {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

interface WordCardGridProps {
  wordGroups: string[][];
  onNewWordGroups: () => void; // Add a callback prop to get new word groups
}

const WordCardGrid: React.FC<WordCardGridProps> = ({ wordGroups, onNewWordGroups }) => {
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [result, setResult] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showYay, setShowYay] = useState<boolean>(false);
  const [correctGroups, setCorrectGroups] = useState<number>(0);

  useEffect(() => {
    const allWords = wordGroups.flat();
    setShuffledWords(shuffleArray(allWords));
  }, [wordGroups]);

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const checkWords = () => {
    const isSameGroup = wordGroups.some(group =>
      selectedWords.every(word => group.includes(word))
    );
    setResult(isSameGroup ? 'Correct!' : 'Incorrect!');
    setShowResult(true);

    if (isSameGroup) {
      setShuffledWords(prevWords => prevWords.filter(word => !selectedWords.includes(word)));
      setCorrectGroups(prev => prev + 1);

      setTimeout(() => {
        setShowResult(false);
        if (correctGroups + 1 === wordGroups.length) {
          setShowYay(true);
          setTimeout(() => {
            setShowYay(false);
            setCorrectGroups(0); // Reset correct groups count
            onNewWordGroups(); // Get new word groups
          }, 1000); // Show "Yay!" for 1 second
        }
        setSelectedWords([]); // Clear selected words
      }, 700); // Hide the result after 0.7 seconds
    } else {
      setTimeout(() => {
        setShowResult(false);
        setSelectedWords([]); // Clear selected words after showing the result
      }, 700); // Hide the result after 0.7 seconds
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 p-0">
        {shuffledWords.map((word, index) => (
          <WordCard
            key={index}
            word={word}
            isSelected={selectedWords.includes(word)}
            onClick={() => handleWordClick(word)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={checkWords}
          className={`px-2 py-1 md:mt-0 mt-12 sm:px-4 sm:py-2 text-black rounded ${
            selectedWords.length === 4
              ? 'bg-emerald-800 transition-colors duration-500 md:hover:bg-amber-500 font-semibold uppercase cursor-pointer'
              : 'bg-red-500 uppercase font-semibold cursor-not-allowed'
          }`}
          disabled={selectedWords.length !== 4}
        >
          Check Words
        </button>
      </div>
      {showResult && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          style={{
            opacity: showResult ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <div className="text-white text-xl sm:text-2xl">{result}</div>
        </div>
      )}
      {showYay && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          style={{
            opacity: showYay ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <div className="text-white text-xl sm:text-2xl">Yay!</div>
        </div>
      )}
    </div>
  );
};

export default WordCardGrid;
