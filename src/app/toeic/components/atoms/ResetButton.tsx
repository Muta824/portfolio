import { useAnswer } from "../../contexts/AnswerContext";
import { useResultsContext } from "../../contexts/ResultContext";
import { useScoreContext } from "../../contexts/ScoreContext";

export const ResetButton = () => {
    {/* 
        answers,resultsの値を変更して
        ChoiceButtons,CorrectButton,WrongButtonコンポーネントを
        無理やり再レンダリングする 
    */}
    const { resetAnswers } = useAnswer();
    const { setResults } = useResultsContext();
    const { setScore } = useScoreContext();
    const handleReset = () => {
        resetAnswers();
        setResults({});
        setScore(null);
        // localStorageから値を削除する
        localStorage.setItem("toeicAnswers","{}");
        localStorage.setItem("toeicResults","{}");
    }

    return (
        <div>
            <button
                onClick={handleReset}
                className="px-4 py-2 bg-green-500 text-white test-xl rounded-md cursor-pointer"
            >
                リセットする
            </button>
        </div>
    )
}