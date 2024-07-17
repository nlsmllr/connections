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

  const fetchNewWordGroups = () => {
    const randomWordGroups = getRandomWordGroups(allWordGroups, 4);
    setSelectedWordGroups(randomWordGroups);
  };

  useEffect(() => {
    fetchNewWordGroups();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className='text-2xl md:text-4xl uppercase font-bold pb-4 pt-10 text-slate-900'>Connections</h1>
      <WordCardGrid wordGroups={selectedWordGroups} onNewWordGroups={fetchNewWordGroups} />
    </div>
  );
}
