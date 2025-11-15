'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/molecules/Card';
import { Text } from '@/components/atoms/Text';
import { Button } from '@/components/atoms/Button';
import { Question } from '../../types/data';
import { QuestionButton } from '../molecules/QuestionButton';
import { ChoiceModal } from '../molecules/ChoiceModal';

interface TestSetQuestionsProps {
    testSetId: string;
    questions: Question[];
}

export function TestSetQuestions({ testSetId, questions }: TestSetQuestionsProps) {
    // this is a user's answers
    const [answers, setAnswers] = useState<Record<number, string>>({});
    // this is a question that the user is currently selecting an answer for
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
    // this is a modal that is open when the user is selecting an answer for a question(selectedQuestion)
    const [isModalOpen, setIsModalOpen] = useState(false);

    // TODO: get answers from database
    // load answers from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(`toeic_scoring_answers_${testSetId}`);
        if (stored) {
            const parsed = JSON.parse(stored);
            setAnswers(parsed);
        }
    }, [testSetId]);

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
        localStorage.setItem(`toeic_scoring_answers_${testSetId}`, JSON.stringify(newAnswers));
        setIsModalOpen(false);
        setSelectedQuestion(null);
    };

    // click a question
    const handleQuestionClick = (questionId: number) => {
        setSelectedQuestion(questionId);
        setIsModalOpen(true);
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
    const progress = (answeredCount / 200) * 100;

    return (
        <>
            <div className="space-y-6 max-w-6xl mx-auto">
                {/* progress bar */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Text variant="small">回答済み: {answeredCount} / 200</Text>
                        <Text variant="small">{Math.round(progress)}%</Text>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                        <div 
                            className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* questions list by part */}
                {Object.entries(questionsByPart).map(([part, partQuestions]) => (
                    <Card key={part} className="space-y-4">
                        <Text variant="h3">Part {part}</Text>
                        <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-10 gap-2">
                            {partQuestions.map(question => (
                                <QuestionButton
                                    key={question.qId}
                                    questionId={question.qId}
                                    selectedAnswer={answers[question.qId]}
                                    onClick={() => handleQuestionClick(question.qId)}
                                />
                            ))}
                        </div>
                    </Card>
                ))}

                {/* finish button */}
                <Button 
                    variant="primary" 
                    size="lg" 
                    fullWidth
                    onClick={() => {
                        // TODO: implement test finish process
                        alert('テスト完了機能は今後実装予定です');
                    }}
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
