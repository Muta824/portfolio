import { useAnswer } from "../contexts/AnswerContext";
import { useResultsContext } from "../contexts/ResultContext";
import { useEffect } from "react";

interface CompareAnswersProps {
    correctAnswers: Record<number, string>;
}

export const CompareAnswers = ({ correctAnswers }: CompareAnswersProps) => {
    const { state: { answers } } = useAnswer(); // ユーザーの回答
    const { setResults } = useResultsContext(); // 結果を保存する関数

    useEffect(() => {
        // 比較ロジック
        const newResults: Record<number, boolean> = {};

        if (Object.keys(correctAnswers).length === 0 || Object.keys(answers).length === 0) {
            setResults({});
            return;
        }

        Object.entries(correctAnswers).forEach(([questionId, correctAnswer]) => {
            const userAnswer = answers[Number(questionId) - 1];
            if (!userAnswer) {
                return; 
            }
            newResults[Number(questionId)] = userAnswer.selectedChoice === correctAnswer;
        });

        // 結果を保存
        setResults(newResults);
    }, [answers, correctAnswers, setResults]);

    return null;
};
