import { useResultsContext } from "../../contexts/ResultContext";
import { useScoreContext } from "../../contexts/ScoreContext";

export const ResultButton = () => {
    const { results } = useResultsContext();
    const { calculateScore } = useScoreContext();
    return (
        <div>  
            <button
                onClick={() => {calculateScore(results)}}
                className="px-4 py-2 bg-green-500 text-white test-xl rounded-md cursor-pointer"
            >
                採点する
            </button>
        </div>
    )
}