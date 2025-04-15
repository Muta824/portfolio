import { useAnswer } from "../../contexts/AnswerContext";
import { memo } from "react";
import type { Question } from "../../types/data";

type ChoiceButtonsProps = {
    q: Question;
}

export const ChoiceButtons = memo(function ChoiceButtons(props: ChoiceButtonsProps) {
    const { q } = props;
    const { state, handleSelect } = useAnswer();
    
    if (!q.choices || q.choices.length === 0) {
        return null;
    }
    
    return (
        <div className="flex justify-center space-x-6">
            {q.choices.map((choice) => (
                <button
                    key={choice}
                    className={`px-7 py-5 rounded-xl border-2 transition-all duration-300 text-lg font-medium ${
                        state.answers.find(a => a.questionId === q.id)?.selectedChoice === choice 
                            ? "bg-blue-500 text-white border-blue-600 shadow-lg hover:bg-blue-600" 
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
