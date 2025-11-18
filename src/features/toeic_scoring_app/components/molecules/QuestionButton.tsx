import { Text } from "@/components/atoms/Text";

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
                aspect-square rounded-lg border-2 font-semibold relative hover:scale-105 cursor-pointer
                ${selectedAnswer
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
                }
            `}
        >
            
            {selectedAnswer ? (
                <div className="flex flex-col items-center justify-center">
                    <Text variant="body" className="text-white absolute top-0 left-1">
                        {questionId}
                    </Text>
                    <Text variant="h3" className="font-bold text-white">{selectedAnswer}</Text>
                </div>
            ) : (
                <Text variant="h3">{questionId}</Text>
            )}
        </button>
    );
}
