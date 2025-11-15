import { Question } from '../types/data';

export interface ScoreResult {
    correctCount: number;
    totalQuestions: number;
    percentage: number;
    score: number; // TOEICスコア（990点満点）
}

/**
 * ユーザーの回答と正解を比較してスコアを計算
 * TODO: 正解の答えは将来的にデータベースから取得する
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

/**
 * 正解の答えを取得（現時点ではモックデータ）
 * TODO: データベースから取得する実装に置き換える
 */
export function getCorrectAnswers(testSetId: string): Record<number, string> {
    // 現時点ではlocalStorageから取得を試みる
    const stored = localStorage.getItem(`toeic_scoring_correct_answers_${testSetId}`);
    if (stored) {
        return JSON.parse(stored);
    }
    
    // モックデータ（実際の実装では削除）
    // すべての答えを "A" として設定（デモ用）
    const mockAnswers: Record<number, string> = {};
    for (let i = 1; i <= 200; i++) {
        mockAnswers[i] = "A";
    }
    return mockAnswers;
}

