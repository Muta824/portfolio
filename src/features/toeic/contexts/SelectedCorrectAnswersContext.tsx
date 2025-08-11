'use client'

import React, { createContext, useContext, useState, ReactNode } from "react";

interface SelectedCorrectAnswersContextType {
    selectedCorrectAnswers: string;
    setSelectedCorrectAnswers: (value: string) => void;
}

const SelectedCorrectAnswersContext = createContext<SelectedCorrectAnswersContextType | undefined>(undefined);

export const SelectedCorrectAnswersProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCorrectAnswers, setSelectedCorrectAnswers] = useState<string>("");

    return (
        <SelectedCorrectAnswersContext.Provider value={{ selectedCorrectAnswers, setSelectedCorrectAnswers }}>
            {children}
        </SelectedCorrectAnswersContext.Provider>
    );
};

export const useSelectedCorrectAnswers = (): SelectedCorrectAnswersContextType => {
    const context = useContext(SelectedCorrectAnswersContext);
    if (!context) {
        throw new Error("useSelectedCorrectAnswers must be used within a SelectedCorrectAnswersProvider");
    }
    return context;
};
