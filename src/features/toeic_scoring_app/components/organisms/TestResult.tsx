'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';
import { ScoreDisplay } from '../molecules/ScoreDisplay';
import { ButtonLink } from '../atoms/ButtonLink';
import { getResult } from '../../actions/result';

interface TestResultData {
    testSetId: string;
    answers: Record<number, string>;
    score: number;
    correctCount: number;
    totalQuestions: number;
    percentage: number;
    completedAt: string;
}

interface TestResultProps {
    testSetId: string;
    answerSheetId: string;
}

export function TestResult({ testSetId, answerSheetId }: TestResultProps) {
    const [result, setResult] = useState<TestResultData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getResult(testSetId, answerSheetId).then((data) => {
            if (data) {
                setResult({
                    testSetId: data.testSetId,
                    answers: data.answers,
                    score: data.score,
                    correctCount: data.correctCount,
                    totalQuestions: data.totalQuestions,
                    percentage: data.percentage,
                    completedAt: data.completedAt,
                });
            }
            setLoading(false);
        }).catch((error) => {
            console.error('エラーが発生しました:', error);
            setLoading(false);
        });
    }, [testSetId, answerSheetId]);

    if (loading) {
        return (
            <Card>
                <Text>読み込み中...</Text>
            </Card>
        );
    }

    if (!result) {
        return (
            <Card>
                <Text>結果が見つかりませんでした。</Text>
            </Card>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <ScoreDisplay
                score={result.score}
                correctCount={result.correctCount}
                totalQuestions={result.totalQuestions}
                percentage={result.percentage}
                completedAt={result.completedAt}
            />

            <div className="flex gap-4">
                <ButtonLink 
                    href={`/toeic_scoring_app/${testSetId}/${answerSheetId}`}
                    variant="primary"
                    size="lg"
                >
                    テストに戻る
                </ButtonLink>
                <ButtonLink 
                    href="/toeic_scoring_app"
                    variant="secondary"
                    size="lg"
                >
                    テスト一覧に戻る
                </ButtonLink>
            </div>
        </div>
    );
}