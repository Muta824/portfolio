'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { AnswerSheetCard } from '../molecules/AnswerSheetCard';
import { AnswerSheetCreateForm } from '../molecules/AnswerSheetCreateForm';
import { UserAnswerSheet } from '../../types/data';
import { getUserAnswerSheets, createUserAnswerSheet, deleteUserAnswerSheet } from '../../utils/userAnswerSheetManager';

interface UserAnswerSheetSelectorProps {
    testSetId: string;
    onSelect?: (answerSheetId: string) => void;
}

export function UserAnswerSheetSelector({ testSetId, onSelect }: UserAnswerSheetSelectorProps) {
    const router = useRouter();
    const [answerSheets, setAnswerSheets] = useState<UserAnswerSheet[]>([]);
    const [newAnswerSheetName, setNewAnswerSheetName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const loadAnswerSheets = useCallback(() => {
        const sheets = getUserAnswerSheets(testSetId);
        // 作成日時の新しい順にソート
        sheets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAnswerSheets(sheets);
    }, [testSetId]);

    useEffect(() => {
        loadAnswerSheets();
    }, [loadAnswerSheets]);

    const handleCreate = () => {
        if (!newAnswerSheetName.trim()) return;
        
        const answerSheet = createUserAnswerSheet(testSetId, newAnswerSheetName.trim());
        setNewAnswerSheetName('');
        setIsCreating(false);
        loadAnswerSheets();
        // 作成した回答用紙にナビゲーション
        if (onSelect) {
            onSelect(answerSheet.id);
        } else {
            router.push(`/toeic_scoring_app/${testSetId}/${answerSheet.id}`);
        }
    };

    const handleDelete = (e: React.MouseEvent, answerSheetId: string) => {
        e.stopPropagation();
        if (window.confirm('この回答用紙を削除しますか？')) {
            deleteUserAnswerSheet(testSetId, answerSheetId);
            loadAnswerSheets();
        }
    };

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
