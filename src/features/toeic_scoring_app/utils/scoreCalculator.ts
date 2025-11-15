import { Question } from '../types/data';

export interface ScoreResult {
    correctCount: number;
    totalQuestions: number;
    percentage: number;
    score: number; // TOEICスコア（990点満点）
}

/**
 * ユーザーの回答と正解を比較してスコアを計算
 */
export function calculateScore(
    userAnswers: Record<number, string>,
    correctAnswers: Record<number, string>,
    questions: Question[]
): ScoreResult {
    let correctCount = 0;
    const totalQuestions = questions.length;

    // ユーザーが回答した問題のみを比較
    questions.forEach(question => {
        const userAnswer = userAnswers[question.qId];
        const correctAnswer = correctAnswers[question.qId];
        
        if (userAnswer && correctAnswer && userAnswer === correctAnswer) {
            correctCount++;
        }
    });

    const percentage = (correctCount / totalQuestions) * 100;
    
    // TOEICスコアの簡易計算（実際のスコアリング方式に合わせて調整が必要）
    // 990点満点で、正答率に基づいて計算
    const score = Math.round((correctCount / totalQuestions) * 990);

    return {
        correctCount,
        totalQuestions,
        percentage,
        score
    };
}

