import "../globals.css";
import { AnswerProvider } from "./contexts/AnswerContext";
import { GradingModeProvider } from "./contexts/GradingModeContext";
import { ResultsProvider } from "./contexts/ResultContext";
import { ScoreProvider } from "./contexts/ScoreContext";
import { SelectedCorrectAnswersProvider } from "./contexts/SelectedCorrectAnswersContext";

export const metadata = {
  title: "TOEIC Scoring App",
  description: "TOEIC Scoring App",
}

export default function TOEICLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AnswerProvider>
      <ResultsProvider>
        <ScoreProvider>
          <GradingModeProvider>
            <SelectedCorrectAnswersProvider>
              <div className="min-h-screen font-sans bg-white dark:bg-gray-900">
                <div className="max-w-5xl mx-auto">
                  <div className="space-y-12">
                    {children}
                  </div>
                </div>
              </div>
            </SelectedCorrectAnswersProvider>
          </GradingModeProvider>
        </ScoreProvider>
      </ResultsProvider>
    </AnswerProvider>
  )
}
