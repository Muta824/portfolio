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
    const [sheetName, setSheetName] = useState(answerSheet.name);
    const [displaySheetName, setDisplaySheetName] = useState(answerSheet.name);

    const answeredCount = Object.keys(answerSheet.answers).length;

    return (
        <Card
            className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors p-4 relative group"
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <Text variant="h3">{displaySheetName}</Text>
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
                        onClick={(e) => {
                            e.preventDefault();
                            setIsUpdating(true);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700 px-2 text-xl"
                        title="Update"
                    >
                        ✎
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
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
                <div 
                    className="fixed inset-0 bg-black/70 dark:bg-black/70 flex items-center justify-center z-50 p-4"
                    onClick={(e) => {
                        e.preventDefault();
                        setSheetName(answerSheet.name);
                        setIsUpdating(false);
                    }}
                >
                    <div 
                        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-md w-full space-y-4"
                    >
                        <Text variant="h3" className="mb-4">Rename</Text>
                        <Input
                            value={sheetName}
                            onChange={(e) => setSheetName(e.target.value)}
                            className="w-full mb-4 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            autoFocus
                        />
                        <div className="flex gap-3 justify-end">
                            <Button 
                                onClick={() => {
                                    // Update the answer sheet name in the database
                                    updateUserAnswerSheetName(answerSheet.testSetId, answerSheet.id, sheetName);
                                    // Update the sheet name on client side
                                    setDisplaySheetName(sheetName);
                                    setIsUpdating(false);
                                }} 
                                variant="primary" 
                                className="cursor-pointer"
                            >
                                Save
                            </Button>
                            <Button 
                                onClick={() => {
                                    // Cancel the update and revert to the original sheet name
                                    setSheetName(answerSheet.name);
                                    setIsUpdating(false);
                                }} 
                                variant="secondary" 
                                className="cursor-pointer"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}

