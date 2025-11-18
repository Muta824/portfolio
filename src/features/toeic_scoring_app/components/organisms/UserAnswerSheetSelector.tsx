'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { Spinner } from '@/components/atoms/Spinner';
import { Card } from '@/components/molecules/Card';
import { AnswerSheetCard } from '../molecules/AnswerSheetCard';
import { AnswerSheetCreateForm } from '../molecules/AnswerSheetCreateForm';
import { UserAnswerSheet } from '../../types/data';
import { getUserAnswerSheets, createUserAnswerSheet, deleteUserAnswerSheet } from '../../actions/userAnswerSheet';

interface UserAnswerSheetSelectorProps {
    testSetId: string;
}

export function UserAnswerSheetSelector({ testSetId }: UserAnswerSheetSelectorProps) {
    const router = useRouter();
    const [answerSheets, setAnswerSheets] = useState<UserAnswerSheet[]>([]);
    const [newAnswerSheetName, setNewAnswerSheetName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // useCallback is used for preventing unnecessary re-creation of the function on every render.
    const loadAnswerSheets = useCallback(async () => {
        const sheets = await getUserAnswerSheets(testSetId);
        setAnswerSheets(sheets);
        setIsLoading(false);
    }, [testSetId]);

    // loadAnswerSheets is called only when the component mounts or when testSetId changes.
    useEffect(() => { loadAnswerSheets(); }, [loadAnswerSheets]);

    const handleCreate = async () => {
        if (!newAnswerSheetName.trim()) return;

        setIsLoading(true);
        const answerSheet = await createUserAnswerSheet(testSetId, newAnswerSheetName.trim());
        if (!answerSheet) {
            alert('An error occurred. Please try again.');
            setIsLoading(false);
            return;
        }
        setNewAnswerSheetName('');
        setIsCreating(false);
        await loadAnswerSheets();
        
        // Navigate to created answer sheet
        router.push(`/toeic_scoring_app/${testSetId}/${answerSheet.id}`);
    };

    const handleDelete = async (e: React.MouseEvent, answerSheetId: string) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this answer sheet?')) {
            setIsLoading(true);
            await deleteUserAnswerSheet(testSetId, answerSheetId);
            await loadAnswerSheets();
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <Card className="space-y-4">
                <div className="flex justify-between items-center">
                    <Text variant="h2">Select an answer sheet</Text>
                    {!isCreating && 
                        <Button 
                            onClick={() => setIsCreating(true)} 
                            variant="primary"
                            className="cursor-pointer"
                        >
                            + New Answer Sheet
                        </Button>
                    }
                </div>
                
                {/* 新規作成フォーム */}
                {isCreating && 
                    <AnswerSheetCreateForm
                        value={newAnswerSheetName}
                        onChange={setNewAnswerSheetName}
                        onSubmit={handleCreate}
                        onCancel={() => {
                            setIsCreating(false);
                            setNewAnswerSheetName('');
                        }}
                    />
                }

                {/* 既存の回答用紙一覧 */}
                {answerSheets.length > 0 && (
                    <div className="space-y-2">
                        <Text variant="h4" className="text-gray-600 dark:text-gray-400">
                            Existing answer sheets
                        </Text>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {answerSheets.map((answerSheet) => (
                                <Link key={answerSheet.id} href={`/toeic_scoring_app/${testSetId}/${answerSheet.id}`}>
                                    <AnswerSheetCard
                                        answerSheet={answerSheet}
                                        onDelete={(e) => handleDelete(e, answerSheet.id)}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
