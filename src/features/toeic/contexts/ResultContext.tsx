'use client'

import { createContext, useContext, useState, useEffect } from "react";
import type { Results } from "../types/data";

type ResultsContextType = {
  results: Results;
  setResults: React.Dispatch<React.SetStateAction<Results>>
  handleResultSelect: (questionId: number, isCorrect: boolean) => void;
};

const ResultsContext = createContext<ResultsContextType | undefined>(undefined);

export const ResultsProvider = ({ children }: { children: React.ReactNode }) => {
  const [results, setResults] = useState<Results>({});

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("toeicResults") || "{}");
    setResults(savedResults);
  }, []);

  const handleResultSelect = (questionId: number, isCorrect: boolean) => {
    const newResults = { ...results, [questionId]: isCorrect };
    setResults(newResults);
    localStorage.setItem("toeicResults", JSON.stringify(newResults));
  };

  return (
    <ResultsContext.Provider value={{ results, setResults, handleResultSelect }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResultsContext = () => {
  const context = useContext(ResultsContext);
  if (!context) {
    throw new Error("useResultsContext must be used within a ResultsProvider");
  }
  return context;
};
