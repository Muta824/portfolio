import { useAnswer } from "../contexts/AnswerContext";
import { useResultsContext } from "../contexts/ResultContext";
import { useSelectedCorrectAnswers } from "../contexts/SelectedCorrectAnswersContext";
import { useEffect } from "react";
import { Results } from "../types/data";

type Props = {
    correctAnswers: Record<string, Record<number, string>>;
}

export const CompareAnswers = ({ correctAnswers }: Props) => {
    const { state: { answers } } = useAnswer(); // ユーザーの回答
    const { setResults } = useResultsContext();
    const { selectedCorrectAnswers } = useSelectedCorrectAnswers();

    useEffect(() => {
        // 比較ロジック
        const newResults: Results = {};

        // ユーザーの回答と模範解答が空の場合は、結果を保存しない
        if (!selectedCorrectAnswers || answers.length === 0) {
            setResults({});
            return;
        }
        
        // ユーザーの回答がある問題のみを比較
        answers.forEach(answer => {
            const questionId = answer.questionId;
            const correctAnswer = correctAnswers[selectedCorrectAnswers][questionId];
            const userAnswer = answer.selectedChoice;
            newResults[questionId] = correctAnswer === userAnswer;
        });

        // 結果を保存
        setResults(newResults);
    }, [answers, selectedCorrectAnswers, setResults, correctAnswers]); 

    return null;
};
