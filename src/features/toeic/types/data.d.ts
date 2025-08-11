//各問題のデータ
export interface Question {
    id: number; //問題番号
    text: string; //問題名
    choices: string[]; //選択肢A~D
}

//各問題の回答データ
export interface Answers {
    [questionId: number]: string;
}

//各問題の正解、不正解のデータ
export interface Score {
    correct: number;
    total: number;
    percentage: number;
    sectionScores?: {
        listening: number;
        reading: number;
    };
}

export interface Result {
    score: Score;
    incorrectQuestions: number[];
    timeSpent: number;
}

export interface Results {
    [questionId: number]: boolean;
}

export interface TimerState {
    isRunning: boolean;
    timeRemaining: number;
    startTime?: Date;
    endTime?: Date;
}

export interface GradingModeState {
    isGradingMode: boolean;
    correctAnswers: string[];
}

export interface SaveState {
    isSaving: boolean;
    error: string | null;
    lastSaved: Date | null;
}

//引数に問題のidと回答データを渡し、answersに保存
export type HandleSelect = (questionId: number, choice: string) => void;
//引数に問題のidと回答データを渡し、resultsに保存
export type HandleResultSelect = (questionId: number, isCorrect: boolean) => void;
