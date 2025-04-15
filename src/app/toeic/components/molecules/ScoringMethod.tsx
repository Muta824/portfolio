import { useEffect, useState } from "react";
import { useGradingMode } from "../../contexts/GradingModeContext";
import { useSelectedCorrectAnswers } from "../../contexts/SelectedCorrectAnswersContext";
import { CompareAnswers } from "../../hooks/CompareAnswers";

type savedCorrectAnswers = {
    [key: string]: Record<number, string>;
};

export const ScoringMethod = () => {
    const { selectedCorrectAnswers, setSelectedCorrectAnswers } = useSelectedCorrectAnswers();
    const { gradingMode, setGradingMode } = useGradingMode();
    const [savedCorrectAnswers, setSavedCorrectAnswers] = useState<savedCorrectAnswers>({});
    
    useEffect(() => {
        const storedAnswers = localStorage.getItem("correctAnswers");
        if (storedAnswers) {
            const parsedAnswers = JSON.parse(storedAnswers);
            setSavedCorrectAnswers(parsedAnswers);

            // 初期値を設定
            if (Object.keys(parsedAnswers).length > 0) {
                setSelectedCorrectAnswers(Object.keys(parsedAnswers)[0]); // 最初の模範解答を選択
            }
        }
    }, [setSelectedCorrectAnswers]);
    
    return (
        <div className="p-6 mt-6 border-2 border-gray-200 rounded-xl shadow-lg bg-white">
            <div className="mb-8">
                <label className="block text-2xl font-bold text-center mb-6 text-gray-800">
                    採点方法を選択
                </label>
                <div className="flex justify-center space-x-6">
                    <button
                        className={`px-8 py-4 rounded-xl border-2 transition-all duration-300 text-lg font-medium ${
                            gradingMode === "manual" 
                                ? "bg-blue-500 text-white border-blue-600 shadow-lg hover:bg-blue-600" 
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-300"
                        }`}
                        onClick={() => setGradingMode("manual")}
                    >
                        手動採点
                    </button>
                    <button
                        className={`px-8 py-4 rounded-xl border-2 transition-all duration-300 text-lg font-medium ${
                            gradingMode === "auto" 
                                ? "bg-blue-500 text-white border-blue-600 shadow-lg hover:bg-blue-600" 
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-300"
                        }`}
                        onClick={() => setGradingMode("auto")}
                    >
                        自動採点
                    </button>
                </div>
            </div>

            {gradingMode === "auto" && (
                <div className="mb-8">
                    <label className="block text-xl font-semibold mb-4 text-gray-700">
                        模範解答を選択
                    </label>
                    <select
                        value={selectedCorrectAnswers}
                        onChange={(e) => setSelectedCorrectAnswers(e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    >
                        {Object.keys(savedCorrectAnswers).map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {gradingMode === "auto" && Object.keys(savedCorrectAnswers).length > 0 && (
                <CompareAnswers correctAnswers={savedCorrectAnswers[selectedCorrectAnswers]} />
            )}
        </div>
    )
}
