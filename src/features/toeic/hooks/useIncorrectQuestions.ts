import { useMemo } from "react";
import { useResultsContext } from "../contexts/ResultContext";

export const useIncorrectQuestions = () => {
  const { results } = useResultsContext();

  const incorrectQuestionIds = useMemo(() => {
    return Object.entries(results)
      .filter(([, isCorrect]) => isCorrect === false) // 不正解の問題をフィルタリング
      .map(([questionId]) => Number(questionId));
  }, [results]);

  return incorrectQuestionIds;
};
