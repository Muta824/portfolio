import { useIncorrectQuestions } from "../../hooks/useIncorrectQuestions";
  
export const IncorrectList = () => {
  const incorrectQuestionIds = useIncorrectQuestions();
  if (incorrectQuestionIds.length === 0) return null;
  return (
    <div className="mt-6 p-4 bg-red-100 rounded-md shadow dark:bg-red-900 dark:text-white">
      <h2 className="font-bold text-lg mb-2 text-red-700 dark:text-white">間違えた問題</h2>
      <ul className="list-disc pl-6 text-red-600 dark:text-white">
        {incorrectQuestionIds.map((id) => (
          <li key={id}>Q{id}</li>
        ))}
      </ul>
    </div>
  );
};
  