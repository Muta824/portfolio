import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';

interface ChoiceModalProps {
    questionId: number;
    selectedAnswer?: string;
    onSelect: (answer: string) => void;
    onClose: () => void;
}

export function ChoiceModal({ 
    questionId, 
    selectedAnswer, 
    onSelect, 
    onClose 
}: ChoiceModalProps) {
    const choices = ["A", "B", "C", "D"];

    return (
        <div 
            className="fixed inset-0 bg-black/70 dark:bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-md w-full space-y-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <Text variant="h3">No. {questionId}</Text>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    {choices.map((choice) => (
                        <Button
                            key={choice}
                            variant={selectedAnswer === choice ? 'primary' : 'secondary'}
                            className="border border-gray-300 dark:border-gray-700"
                            size="lg"
                            fullWidth
                            onClick={() => onSelect(choice)}
                        >
                            {choice}
                        </Button>
                    ))}
                </div>

                {selectedAnswer && (
                    <Button
                        variant="ghost"
                        size="md"
                        fullWidth
                        className="mt-2 cursor-pointer"
                        onClick={() => onSelect("")}
                    >
                        Clear Selection
                    </Button>
                )}

                {selectedAnswer && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Text variant="small" className="text-center">
                            Selected: {selectedAnswer}
                        </Text>
                    </div>
                )}
            </div>
        </div>
    );
}
