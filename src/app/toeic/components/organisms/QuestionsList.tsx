import { useGradingMode } from "../../contexts/GradingModeContext"
import { ChoiceButtons } from "../molecules/ChoiceButtons"
import { GradingButtons } from "../molecules/GradingButtons"
import type { Question } from "../../types/data"
import { memo } from "react"

type QuestionsProps = {
    questions: Question[];
}

export const QuestionsList = memo(function Questions(props: QuestionsProps) {
    const { questions } = props;
    const { gradingMode } = useGradingMode();
    
    return (
        <div className="space-y-8">
            {questions.map((q) => (
                <div key={q.id} className="p-6 border-2 border-gray-200 rounded-xl shadow-lg bg-white"> 
                    <p className="text-2xl font-bold mb-6 text-gray-800 ">{q.text}</p>
                    <div className="space-y-4">
                        <ChoiceButtons q={q}/>
                        {gradingMode === "manual" && (
                            <GradingButtons q={q}/>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
})
