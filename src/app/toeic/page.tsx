'use client'

import { QuestionsList } from "./components/organisms/QuestionsList";
import { Result } from "./components/organisms/Result";
import { Timer } from "./components/organisms/Timer";
import { CorrectAnswersSaveForm } from "./components/organisms/CorrectAnswersSaveForm";
import { ErrorBoundary } from "./components/molecules/ErrorBoundary";
import { Question } from "./types/data";
import '../globals.css'

const generateQuestions = (): Question[] => 
  Array.from({ length: 200 }, (_, index) => ({
    id: index + 1,
    text: `Q${index + 1}`,
    choices: ["A", "B", "C", "D"],
    correctAnswer: undefined
  }));

const questions = generateQuestions();

export const TOEICScoringPage = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <h1 className="py-6 text-4xl text-center font-bold text-gray-800">
            TOEIC Scoring App
          </h1>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <Timer />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <Result />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <CorrectAnswersSaveForm questions={questions} />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <QuestionsList questions={questions} />
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default TOEICScoringPage;
