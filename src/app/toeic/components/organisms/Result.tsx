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
        <div className={`mt-5`}>
            <ScoringMethod/>
            <div className="flex justify-evenly mt-4 mb-4 border p-4 rounded-md">
                <ResultButton/>
                <ResetButton/>
            </div>
            {score !== null && (
                <div>
                    <p className="mt-4 text-2xl font-bold">正解数: {score} / 200</p>
                    <IncorrectList/>
                </div>
            )}
            <ResultSaveForm/>
            <SavedResults/>
        </div>
    )
}
