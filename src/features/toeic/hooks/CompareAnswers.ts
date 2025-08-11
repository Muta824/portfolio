import { useAnswer } from "../contexts/AnswerContext";
import { useResultsContext } from "../contexts/ResultContext";
import { useSelectedCorrectAnswers } from "../contexts/SelectedCorrectAnswersContext";
import { useEffect } from "react";
import { Results } from "../types/data";

type Props = {
    correctAnswers: Record<string, Record<number, string>>;
}

export const CompareAnswers = ({ correctAnswers }: Props) => {
    const { answers } = useAnswer(); // ユーザーの回答
    const { setResults } = useResultsContext();
    const { selectedCorrectAnswers } = useSelectedCorrectAnswers();

    useEffect(() => {
        const newResults: Results = {};

        // ユーザーの回答と模範解答が空の場合は、結果を保存しない
        if (!selectedCorrectAnswers || Object.keys(answers).length === 0) {
            setResults({});
            return;
        }
        
        // ユーザーの回答がある問題のみを比較
        Object.entries(answers).forEach(([questionId, userAnswer]) => {
            const correctAnswer = correctAnswers[selectedCorrectAnswers][Number(questionId)];
            newResults[Number(questionId)] = correctAnswer === userAnswer;
        });

        // 結果を保存
        setResults(newResults);
    }, [answers, selectedCorrectAnswers, setResults, correctAnswers]); 

    return null;
};
