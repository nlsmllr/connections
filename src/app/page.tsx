"use client"

import React, { useState, useEffect } from 'react';
import WordCardGrid from './Components/WordCardGrid';
import { wordGroups as allWordGroups } from './Constants/WordGroups';

function getRandomWordGroups(wordGroups: string[][], count: number): string[][] {
  const shuffled = wordGroups.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function App() {
  const [selectedWordGroups, setSelectedWordGroups] = useState<string[][]>([]);
 const [showInfo, setShowInfo] = useState(false);

  const fetchNewWordGroups = () => {
    const randomWordGroups = getRandomWordGroups(allWordGroups, 4);
    setSelectedWordGroups(randomWordGroups);
  };

  useEffect(() => {
    fetchNewWordGroups();
  }, []);

  const toggleInfo = () => setShowInfo(!showInfo);


 return (
    <div className="flex flex-col items-center justify-center md:min-h-screen min-h-[85vh] bg-zinc-900 md:p-4 p-1 overflow-hidden">
      <button onClick={toggleInfo} className="z-50 border border-zinc-500 rounded-full py-1 px-[14px] absolute top-4 right-4 p-2 text-zinc-500 hover:text-zinc-300">
        i
      </button>
      {showInfo && (
        <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="m-2 bg-zinc-900 p-8 md:p-12 rounded-xl md:rounded-lg text-white">
            <p>Find group of 4 that have something in common. Select by tapping.</p>
            <p>Enjoy the game!</p>
            <button onClick={toggleInfo} className="text-black uppercase  font-semibold mt-8 px-4 py-2 bg-red-500 rounded hover:bg-amber-500 ">Close</button>
          </div>
        </div>
      )}
      <h1 className='text-2xl md:text-4xl uppercase font-bold pb-4 text-zinc-500'>Connections</h1>
      <WordCardGrid wordGroups={selectedWordGroups} onNewWordGroups={fetchNewWordGroups} />
    </div>
  );
}
