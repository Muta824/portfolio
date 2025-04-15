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
            className={`px-6 py-4 mt-2 rounded-lg border-2 transition-all duration-200 ${
                results[q.id] === true 
                    ? "bg-green-500 text-white border-green-600 shadow-md" 
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handleResultSelect(q.id, true)}
        >
            〇
        </button>
    )
}
