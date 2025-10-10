'use client'

import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { QuestionsList } from "@/features/toeic/components/organisms/QuestionsList";
import { Result } from "@/features/toeic/components/organisms/Result";
import { Timer } from "@/features/toeic/components/organisms/Timer";
import { CorrectAnswersSaveForm } from "@/features/toeic/components/organisms/CorrectAnswersSaveForm";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { GoBackButton } from "@/components/atoms/GoBackLink";
import { ScrollToTopButton } from "@/features/toeic/components/atoms/ScrollToTopButton";
import { Question } from "@/features/toeic/types/data";
import '../globals.css'

//問題データを生成
const questions: Question[] = []
for (let i = 1; i <= 200; i++) {
  questions.push({
    id: i,
    text: `Q${i}`,
    choices: ["A", "B", "C", "D"],
  })
}

export default function TOEICScoringPage() {
  const [isTimer, setIsTimer] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isCorrectAnswersSaveForm, setIsCorrectAnswersSaveForm] = useState(false);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-6 px-1 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <GoBackButton />
            <ThemeToggle />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight md:text-5xl text-center">
            TOEIC Scoring App
          </h1>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <div className="flex flex-wrap justify-center sm:justify-evenly gap-4">
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
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
