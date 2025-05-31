'use client'

import { useEffect } from 'react';
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Answer, HandleSelect } from '../types/data';

interface AnswerState {
  answers: Answer[];
  selectedQuestionId: number | null;
}

type AnswerAction =
  | { type: 'SET_ANSWER'; payload: Answer }
  | { type: 'SET_SELECTED_QUESTION'; payload: number | null }
  | { type: 'RESET_ANSWERS' };

const initialState: AnswerState = {
  answers: [],
  selectedQuestionId: null,
};

const AnswerContext = createContext<{
  state: AnswerState;
  handleSelect: HandleSelect;
  setSelectedQuestion: (id: number | null) => void;
  resetAnswers: () => void;
} | undefined>(undefined);

const answerReducer = (state: AnswerState, action: AnswerAction): AnswerState => {
  switch (action.type) {
    case 'SET_ANSWER':
      const existingAnswerIndex = state.answers.findIndex(
        a => a.questionId === action.payload.questionId
      );
      
      if (existingAnswerIndex >= 0) {
        const newAnswers = [...state.answers];
        newAnswers[existingAnswerIndex] = action.payload;
        return { ...state, answers: newAnswers };
      }
      
      return { ...state, answers: [...state.answers, action.payload] };
    
    case 'SET_SELECTED_QUESTION':
      return { ...state, selectedQuestionId: action.payload };
    
    case 'RESET_ANSWERS':
      return { ...state, answers: [] };
    
    default:
      return state;
  }
};

export const AnswerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(answerReducer, initialState);


  const handleSelect: HandleSelect = (questionId, choice) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { questionId, selectedChoice: choice },
    });

    // 保存処理
    const stored = localStorage.getItem("toeicAnswers");
    const parsed: Record<number, string> = stored ? JSON.parse(stored) : {};
    parsed[questionId] = choice;
    localStorage.setItem("toeicAnswers", JSON.stringify(parsed));
  };

  const setSelectedQuestion = (id: number | null) => {
    dispatch({ type: 'SET_SELECTED_QUESTION', payload: id });
  };

  const resetAnswers = () => {
    dispatch({ type: 'RESET_ANSWERS' });
  };

  useEffect(() => {
    const stored = localStorage.getItem("toeicAnswers");
    if (stored) {
      const parsed: Record<number, string> = JSON.parse(stored);
      Object.entries(parsed).forEach(([qid, choice]) => {
        dispatch({
          type: 'SET_ANSWER',
          payload: {
            questionId: Number(qid),
            selectedChoice: choice,
          },
        });
      });
    }
  }, []);

  return (
    <AnswerContext.Provider
      value={{ state, handleSelect, setSelectedQuestion, resetAnswers }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export const useAnswer = () => {
  const context = useContext(AnswerContext);
  if (!context) {
    throw new Error('useAnswer must be used within an AnswerProvider');
  }
  return context;
};
