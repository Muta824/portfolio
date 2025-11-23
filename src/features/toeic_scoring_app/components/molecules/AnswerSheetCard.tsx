import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Card } from '@/components/molecules/Card';
import { UserAnswerSheet } from '../../types/data';
import { useState } from 'react';
import { updateUserAnswerSheetName } from '../../actions/userAnswerSheet';

interface AnswerSheetCardProps {
    answerSheet: UserAnswerSheet;
    onDelete: (e: React.MouseEvent) => void;
}

export function AnswerSheetCard({ answerSheet, onDelete }: AnswerSheetCardProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [newName, setNewName] = useState(answerSheet.name);

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
                        Answered: {answeredCount} / 200
                    </Text>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {setIsUpdating(true);}}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700 px-2 text-xl"
                        title="Update"
                    >
                        ✎
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete(e);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 px-2 text-xl"
                        title="Delete"
                    >
                        ×
                    </button>
                </div>
            </div>

            {isUpdating && (
                <div className="absolute top-0 left-0 w-full h-full bg-white dark:bg-gray-800">
                    <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    <Button 
                        onClick={() => {
                            updateUserAnswerSheetName(answerSheet.testSetId, answerSheet.id, newName);
                            setIsUpdating(false);
                        }} 
                        variant="primary" 
                        className="cursor-pointer"
                    >
                        Save
                    </Button>
                    <Button onClick={() => setIsUpdating(false)} variant="secondary" className="cursor-pointer">Cancel</Button>
                </div>
            )}
        </Card>
    );
}

