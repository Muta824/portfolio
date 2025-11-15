'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';
import { ScoreDisplay } from '../molecules/ScoreDisplay';
import { ButtonLink } from '../atoms/ButtonLink';

interface TestResultData {
    testSetId: string;
    answers: Record<number, string>;
    correctAnswers: Record<number, string>;
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

    useEffect(() => {
        const stored = localStorage.getItem(`toeic_scoring_result_${testSetId}_${answerSheetId}`);
        if (stored) {
            setResult(JSON.parse(stored));
        }
    }, [testSetId, answerSheetId]);

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
                    href={`/toeic_scoring_app/${testSetId}`}
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