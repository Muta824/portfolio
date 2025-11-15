interface QuestionButtonProps {
    questionId: number;
    selectedAnswer?: string;
    onClick: () => void;
}

export function QuestionButton({ questionId, selectedAnswer, onClick }: QuestionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
                aspect-square rounded-lg border-2 font-semibold text-sm
                transition-all duration-200 hover:scale-105 cursor-pointer
                ${selectedAnswer
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }
            `}
        >
            {questionId}
            {selectedAnswer && (
                <div className="text-xs mt-0.5">{selectedAnswer}</div>
            )}
        </button>
    );
}
