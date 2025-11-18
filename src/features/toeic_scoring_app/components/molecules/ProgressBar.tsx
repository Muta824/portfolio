import { Text } from '@/components/atoms/Text';

interface ProgressBarProps {
    answeredCount: number;
    totalCount: number;
}

export function ProgressBar({ answeredCount, totalCount }: ProgressBarProps) {
    const progress = (answeredCount / totalCount) * 100;

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Text variant="small">Answered: {answeredCount} / {totalCount}</Text>
                <Text variant="small">{Math.round(progress)}%</Text>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

