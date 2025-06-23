import { useAnswer } from "../../contexts/AnswerContext";
import { memo } from "react";
import type { Question } from "../../types/data";

export const ChoiceButtons = memo(function ChoiceButtons({q}: {q: Question}) {
    const { answers, handleSelect } = useAnswer();
    
    return (
        <div className="flex flex-row justify-evenly space-x-1">
            {q.choices.map((choice) => (
                <button
                    key={choice}
                    className={`px-5 py-3 sm:px-7 sm:py-5 rounded-xl border-2 text-lg font-medium dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 ${
                        answers[q.id] === choice 
                            ? "bg-blue-500 text-white border-blue-600 shadow-lg hover:bg-blue-600 dark:bg-sky-600 dark:hover:bg-sky-700" 
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-blue-300"
                    }`}
                    onClick={() => handleSelect(q.id, choice)}
                >
                    {choice}
                </button>
            ))}
        </div>
    )
});
