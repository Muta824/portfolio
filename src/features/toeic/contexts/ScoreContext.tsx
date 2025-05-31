'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { Results } from "../types/data";

type ScoreContextType = {
    score: number | null;
    setScore: React.Dispatch<React.SetStateAction<number | null>>
    calculateScore: (results: Results) => void;
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
    const [score, setScore] = useState<number | null>(null);

    const calculateScore = useCallback((results: Results) => {
        const correctCount = Object.values(results).filter((isCorrect) => isCorrect === true).length;
        setScore(correctCount);
    }, []);

    return (
        <ScoreContext.Provider value={{ score, setScore, calculateScore }}>
            {children}
        </ScoreContext.Provider>
    );
};

export const useScoreContext = () => {
    const context = useContext(ScoreContext);
    if (!context) {
        throw new Error("useScoreContext must be used within a ScoreProvider");
    }
    return context;
};
