'use client'

import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { QuestionsList } from "@/features/toeic/components/organisms/QuestionsList";
import { Result } from "@/features/toeic/components/organisms/Result";
import { Timer } from "@/features/toeic/components/organisms/Timer";
import { CorrectAnswersSaveForm } from "@/features/toeic/components/organisms/CorrectAnswersSaveForm";
import { ErrorBoundary } from "@/features/toeic/components/molecules/ErrorBoundary";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import ScrollToTopButton from "@/features/toeic/components/atoms/ScrollToTopButton";
import { Question } from "@/features/toeic/types/data";
import '../globals.css'

const generateQuestions = (): Question[] => 
  Array.from({ length: 200 }, (_, index) => ({
    id: index + 1,
    text: `Q${index + 1}`,
    choices: ["A", "B", "C", "D"],
    correctAnswer: undefined
  }));

const questions = generateQuestions();

export default function TOEICScoringPage() {
  const [isTimer, setIsTimer] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isCorrectAnswersSaveForm, setIsCorrectAnswersSaveForm] = useState(false);
  
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <ScrollToTopButton />
        <header className="bg-white dark:bg-gray-900 flex flex-row justify-between items-center">
          <h1 className="py-6 px-4 text-4xl text-center md:text-5xl font-bold text-gray-800 dark:text-white">
            TOEIC Scoring App
          </h1>
          <ThemeToggle />
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="flex flex-wrap justify-evenly gap-4">
              <button className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2 rounded-md"
                onClick={() => setIsTimer(!isTimer)}
              >
                {isTimer ?  
                <div className="flex flex-row items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <p>タイマー</p>
                </div> 
                 : 
                <div className="flex flex-row items-center gap-2">
                  <EyeOff className="w-4 h-4" />
                  <p>タイマー</p>
                </div>}
              </button>
              <button className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2 rounded-md"
                onClick={() => setIsResult(!isResult)}
              >
                {isResult ? 
                <div className="flex flex-row items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <p>スコア計算/結果表示</p>
                </div> 
                : 
                <div className="flex flex-row items-center gap-2">
                  <EyeOff className="w-4 h-4" />
                  <p>スコア計算/結果表示</p>
                </div>}
              </button>
              <button className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2 rounded-md"
                onClick={() => setIsCorrectAnswersSaveForm(!isCorrectAnswersSaveForm)}
              >
                {isCorrectAnswersSaveForm ? 
                <div className="flex flex-row items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <p>模範解答作成</p>
                </div> 
                : 
                <div className="flex flex-row items-center gap-2">
                  <EyeOff className="w-4 h-4" />
                  <p>模範解答作成</p>
                </div>}
              </button>
            </div>

            <div className="space-y-6">
              {isTimer && (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                  <Timer />
                </div>
              )}
              {isResult && (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                  <Result />
                </div>
              )}
              {isCorrectAnswersSaveForm && (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                  <CorrectAnswersSaveForm questions={questions} />
                </div>
              )}
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
              <QuestionsList questions={questions} />
            </div>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}
