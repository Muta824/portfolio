'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { Question } from '../../types/data';
import { ChoiceModal } from '../molecules/ChoiceModal';
import { ProgressBar } from '../molecules/ProgressBar';
import { QuestionPartSection } from '../molecules/QuestionPartSection';
import { calculateScore, getCorrectAnswers } from '../../utils/scoreCalculator';
import { getUserAnswerSheet, saveUserAnswerSheet } from '../../utils/userAnswerSheetManager';

interface TestSetQuestionsProps {
    testSetId: string;
    answerSheetId: string;
    questions: Question[];
}

export function TestSetQuestions({ testSetId, answerSheetId, questions }: TestSetQuestionsProps) {
    const router = useRouter();
    // this is a user's answers
    const [answers, setAnswers] = useState<Record<number, string>>({});
    // this is a question that the user is currently selecting an answer for
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
    // this is a modal that is open when the user is selecting an answer for a question(selectedQuestion)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 回答用紙から回答を読み込む
    useEffect(() => {
        const answerSheet = getUserAnswerSheet(testSetId, answerSheetId);
        if (answerSheet) {
            setAnswers(answerSheet.answers);
        }
    }, [testSetId, answerSheetId]);

    // TODO: get questions from database
    // save answers
    const handleAnswer = (questionId: number, answer: string) => {
        const newAnswers = { ...answers };
        if (answer === "") {
            delete newAnswers[questionId];
        } else {
            newAnswers[questionId] = answer;
        }
        setAnswers(newAnswers);
        
        // 回答用紙を更新
        const answerSheet = getUserAnswerSheet(testSetId, answerSheetId);
        if (answerSheet) {
            answerSheet.answers = newAnswers;
            answerSheet.updatedAt = new Date();
            saveUserAnswerSheet(testSetId, answerSheet);
        }
        
        setIsModalOpen(false);
        setSelectedQuestion(null);
    };

    // click a question
    const handleQuestionClick = (questionId: number) => {
        setSelectedQuestion(questionId);
        setIsModalOpen(true);
    };

    // finish test handler
    const handleFinishTest = () => {
        // 確認ダイアログ
        const confirmed = window.confirm('テストを終了しますか？未回答の問題があっても終了できます。');
        if (!confirmed) return;

        // 正解の答えを取得（AnswerSetから）
        const correctAnswers = getCorrectAnswers(testSetId);
        
        // スコアを計算
        const scoreResult = calculateScore(answers, correctAnswers, questions);
        
        // 結果を保存（answerSheetIdを含める）
        const resultData = {
            testSetId,
            answerSheetId,
            answers,
            correctAnswers,
            score: scoreResult.score,
            correctCount: scoreResult.correctCount,
            totalQuestions: scoreResult.totalQuestions,
            percentage: scoreResult.percentage,
            completedAt: new Date().toISOString()
        };
        
        localStorage.setItem(`toeic_scoring_result_${testSetId}_${answerSheetId}`, JSON.stringify(resultData));
        
        // 結果ページに遷移
        router.push(`/toeic_scoring_app/${testSetId}/${answerSheetId}/result`);
    };

    // group questions by part
    // each part has each question
    const questionsByPart: Record<number, Question[]> = {};
    questions.forEach(q => {
        if (!questionsByPart[q.part]) {
            questionsByPart[q.part] = [];
        }
        questionsByPart[q.part].push(q);
    });

    // count the number of answered questions
    const answeredCount = Object.keys(answers).length;

    return (
        <>
            <div className="space-y-6 max-w-6xl mx-auto">
                {/* progress bar */}
                <ProgressBar answeredCount={answeredCount} totalCount={200} />

                {/* questions list by part */}
                {Object.entries(questionsByPart).map(([part, partQuestions]) => (
                    <QuestionPartSection
                        key={part}
                        part={Number(part)}
                        questions={partQuestions}
                        answers={answers}
                        onQuestionClick={handleQuestionClick}
                    />
                ))}

                {/* finish button */}
                <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth
                    onClick={handleFinishTest}
                >
                    Finish Test
                </Button>
            </div>

            {/* choice modal */}
            {isModalOpen && selectedQuestion !== null && (
                <ChoiceModal
                    questionId={selectedQuestion}
                    selectedAnswer={answers[selectedQuestion]}
                    onSelect={(answer) => handleAnswer(selectedQuestion, answer)}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedQuestion(null);
                    }}
                />
            )}
        </>
    );
}
