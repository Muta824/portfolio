import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';

interface ScoreDisplayProps {
    score: number;
    correctCount: number;
    totalQuestions: number;
    percentage: number;
    completedAt: string;
}

export function ScoreDisplay({ 
    score, 
    correctCount, 
    totalQuestions, 
    percentage, 
    completedAt 
}: ScoreDisplayProps) {
    return (
        <Card className="space-y-4">
            <Text variant="h2">Score</Text>
            <div className="text-center space-y-2">
                <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">
                    {score}
                </div>
                <Text variant="small">Max Score: 990</Text>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                    <Text variant="small" className="text-gray-600 dark:text-gray-400">Correct Count</Text>
                    <Text variant="h3">{correctCount} / {totalQuestions}</Text>
                </div>
                <div>
                    <Text variant="small" className="text-gray-600 dark:text-gray-400">Correct Percentage</Text>
                    <Text variant="h3">{Math.round(percentage)}%</Text>
                </div>
            </div>
            <Text variant="small" className="text-gray-500">
                Completed At: {new Date(completedAt).toLocaleString('ja-JP')}
            </Text>
        </Card>
    );
}

