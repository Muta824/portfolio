import { Question } from '../types/data';

export interface ScoreResult {
    correctCount: number;
    totalQuestions: number;
    percentage: number;
    score: number; // TOEIC score (out of 990)
}

/**
 * Calculate score by comparing user answers with correct answers
 */
export function calculateScore(
    userAnswers: Record<number, string>,
    correctAnswers: Record<number, string>,
    questions: Question[]
): ScoreResult {
    let correctCount = 0;
    const totalQuestions = questions.length;

    // Compare only questions that the user answered
    questions.forEach(question => {
        const userAnswer = userAnswers[question.qId];
        const correctAnswer = correctAnswers[question.qId];
        
        if (userAnswer && correctAnswer && userAnswer === correctAnswer) {
            correctCount++;
        }
    });

    const percentage = (correctCount / totalQuestions) * 100;
    
    // Simple TOEIC score calculation (needs adjustment to match actual scoring method)
    // Out of 990 points, calculated based on correct answer rate
    const score = Math.round((correctCount / totalQuestions) * 990);

    return {
        correctCount,
        totalQuestions,
        percentage,
        score
    };
}

