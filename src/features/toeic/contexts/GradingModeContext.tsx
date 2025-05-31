'use client'

import React, { createContext, useContext, useState, ReactNode } from "react";

type GradingMode = "manual" | "auto";

interface GradingModeContextProps {
    gradingMode: GradingMode;
    setGradingMode: React.Dispatch<React.SetStateAction<GradingMode>>;
}

const GradingModeContext = createContext<GradingModeContextProps | undefined>(undefined);

export const GradingModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [gradingMode, setGradingMode] = useState<GradingMode>("manual");

    return (
        <GradingModeContext.Provider value={{ gradingMode, setGradingMode }}>
            {children}
        </GradingModeContext.Provider>
    );
};

export const useGradingMode = (): GradingModeContextProps => {
    const context = useContext(GradingModeContext);
    if (!context) {
        throw new Error("useGradingMode must be used within a GradingModeProvider");
    }
    return context;
};