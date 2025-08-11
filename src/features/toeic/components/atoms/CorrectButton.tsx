import { useResultsContext } from "../../contexts/ResultContext";
import type { Question } from "../../types/data";

type CorrectButtonProps = {
    q: Question;
}

export function CorrectButton({ q }: CorrectButtonProps) {
    //console.log("Correct Button",q.id);
    const { results, handleResultSelect } = useResultsContext();
    return (
        <button
            className={`px-4 py-2 sm:px-6 sm:py-4 mt-2 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 rounded-lg border-2 ${
                results[q.id] === true 
                    ? "bg-green-500 text-white border-green-600 shadow-md dark:bg-green-500 dark:hover:bg-green-700" 
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleResultSelect(q.id, true)}
        >
            〇
        </button>
    )
}
