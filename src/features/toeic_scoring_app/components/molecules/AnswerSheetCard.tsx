import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';
import { UserAnswerSheet } from '../../types/data';

interface AnswerSheetCardProps {
    answerSheet: UserAnswerSheet;
    onDelete: (e: React.MouseEvent) => void;
}

export function AnswerSheetCard({ answerSheet, onDelete }: AnswerSheetCardProps) {
    const answeredCount = Object.keys(answerSheet.answers).length;

    return (
        <Card
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors p-4 relative group"
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <Text variant="h3">{answerSheet.name}</Text>
                    <Text variant="small" className="text-gray-500">
                        {new Date(answerSheet.createdAt).toLocaleDateString('ja-JP', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                    <Text variant="small" className="text-gray-500">
                        回答数: {answeredCount} / 200
                    </Text>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete(e);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 px-2 text-xl"
                    title="削除"
                >
                    ×
                </button>
            </div>
        </Card>
    );
}

