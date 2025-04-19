import { useScoreContext } from "../../contexts/ScoreContext"
import { ScoringMethod } from "../molecules/ScoringMethod";
import { ResultButton } from "../atoms/ResultButton";
import { ResetButton } from "../atoms/ResetButton";
import { ResultSaveForm } from "../molecules/ResultSaveForm";
import { SavedResults } from "../molecules/SavedResults";
import { IncorrectList } from "../molecules/IncorrectList";

export const Result = () => {
    const { score } = useScoreContext();
    return (
        <div className={`mt-5 max-w-xl mx-auto`}>
            <div className="sm:flex sm:flex-row justify-evenly mb-5">
                <ScoringMethod/>
                <div className="flex sm:flex-col justify-evenly mt-4 mb-4 border px-4 py-2 text-center rounded-md dark:bg-gray-900 dark:text-white">
                    <ResultButton/>
                    <ResetButton/>
                </div>
            </div>
            {score !== null && (
                <div className="bg-gray-50 dark:bg-gray-900 dark:text-white">
                    <p className="mt-4 text-2xl font-bold">正解数: {score} / 200</p>
                    <IncorrectList/>
                </div>
            )}
            <ResultSaveForm/>
            <SavedResults/>
        </div>
    )
}
