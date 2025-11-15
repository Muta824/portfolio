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
import { getUserAnswerSheets, createUserAnswerSheet, deleteUserAnswerSheet } from '../../actions/userAnswerSheet';

interface UserAnswerSheetSelectorProps {
    testSetId: string;
    onSelect?: (answerSheetId: string) => void;
}

export function UserAnswerSheetSelector({ testSetId, onSelect }: UserAnswerSheetSelectorProps) {
    const router = useRouter();
    const [answerSheets, setAnswerSheets] = useState<UserAnswerSheet[]>([]);
    const [newAnswerSheetName, setNewAnswerSheetName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const loadAnswerSheets = useCallback(async () => {
        try {
            const sheets = await getUserAnswerSheets(testSetId);
            // 作成日時の新しい順にソート（サーバー側で既にソートされているが、念のため）
            sheets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setAnswerSheets(sheets);
        } catch (error) {
            console.error('エラーが発生しました:', error);
        }
    }, [testSetId]);

    useEffect(() => {
        loadAnswerSheets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testSetId]);

    const handleCreate = async () => {
        if (!newAnswerSheetName.trim()) return;
        
        try {
            const answerSheet = await createUserAnswerSheet(testSetId, newAnswerSheetName.trim());
            setNewAnswerSheetName('');
            setIsCreating(false);
            await loadAnswerSheets();
            // 作成した回答用紙にナビゲーション
            if (onSelect) {
                onSelect(answerSheet.id);
            } else {
                router.push(`/toeic_scoring_app/${testSetId}/${answerSheet.id}`);
            }
        } catch (error) {
            console.error('エラーが発生しました:', error);
            alert('エラーが発生しました。もう一度お試しください。');
        }
    };

    const handleDelete = async (e: React.MouseEvent, answerSheetId: string) => {
        e.stopPropagation();
        if (window.confirm('この回答用紙を削除しますか？')) {
            try {
                await deleteUserAnswerSheet(testSetId, answerSheetId);
                await loadAnswerSheets();
            } catch (error) {
                console.error('エラーが発生しました:', error);
                alert('エラーが発生しました。もう一度お試しください。');
            }
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
