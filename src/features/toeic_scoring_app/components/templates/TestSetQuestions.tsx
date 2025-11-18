'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { Question } from '../../types/data';
import { ChoiceModal } from '../molecules/ChoiceModal';
import { ProgressBar } from '../molecules/ProgressBar';
import { QuestionPartSection } from '../molecules/QuestionPartSection';
import { calculateScore } from '../../utils/scoreCalculator';
import { getUserAnswerSheet, saveUserAnswerSheet } from '../../actions/userAnswerSheet';
import { getCorrectAnswers } from '../../actions/answerSet';
import { saveResult } from '../../actions/result';

interface TestSetQuestionsProps {
    testSetId: string;
    answerSheetId: string;
    questions: Question[];
}

export function TestSetQuestions({ testSetId, answerSheetId, questions }: TestSetQuestionsProps) {
    const router = useRouter();
    // User's answers
    const [answers, setAnswers] = useState<Record<number, string>>({});
    // Question that the user is currently selecting an answer for
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
    // Modal is open when the user is selecting an answer for a question(selectedQuestion)
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Whether the score is being calculated
    const [isCalculatingScore, setIsCalculatingScore] = useState(false);

    // Load answers from answer sheet
    useEffect(() => {
        getUserAnswerSheet(testSetId, answerSheetId).then((answerSheet) => {
            if (answerSheet) {
                setAnswers(answerSheet.answers);
            }
        });
    }, [testSetId, answerSheetId]);

    // Save answers
    const handleAnswer = async (questionId: number, answer: string) => {
        setIsModalOpen(false);
        setSelectedQuestion(null);
        
        const newAnswers = { ...answers };
        if (answer === "") {
            delete newAnswers[questionId];
        } else {
            newAnswers[questionId] = answer;
        }
        setAnswers(newAnswers);
        
        // Update answer sheet (via server action)
        await saveUserAnswerSheet(testSetId, answerSheetId, newAnswers);
    };

    // click a question
    const handleQuestionClick = (questionId: number) => {
        setSelectedQuestion(questionId);
        setIsModalOpen(true);
    };

    // Finish test handler
    const handleFinishTest = async () => {
        // Confirmation dialog
        const confirmed = window.confirm('Finish the test? You can finish even if there are unanswered questions.');
        if (!confirmed) return;

        setIsCalculatingScore(true);
        // Get correct answers (from AnswerSet)
        const correctAnswers = await getCorrectAnswers(testSetId);
            
        // Calculate score
        const scoreResult = calculateScore(answers, correctAnswers, questions);
        
        // Save result
        await saveResult(testSetId, answerSheetId, {
            score: scoreResult.score,
            percentage: scoreResult.percentage,
            correctCount: scoreResult.correctCount,
            totalQuestions: scoreResult.totalQuestions,
        });

        setIsCalculatingScore(false);
        // Navigate to result page
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
                    className="cursor-pointer"
                    disabled={isCalculatingScore}
                    onClick={handleFinishTest}
                >
                    {isCalculatingScore ? 'Calculating...' : 'Finish Test'}
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
