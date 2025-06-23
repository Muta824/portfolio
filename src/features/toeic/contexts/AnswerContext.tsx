'use client'

import { useEffect } from 'react';
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Answers, HandleSelect } from '../types/data';

type AnswerAction =
  | { type: 'SET_ANSWER'; payload: { questionId: number; selectedChoice: string } }
  | { type: 'RESET_ANSWERS' };

const initialState: Answers = {
  
};

const AnswerContext = createContext<{
  answers: Answers;
  handleSelect: HandleSelect;
  resetAnswers: () => void;
} | undefined>(undefined);


const answerReducer = (state: Answers, action: AnswerAction): Answers => {
  switch (action.type) {
    case 'SET_ANSWER':
      return { ...state, [action.payload.questionId]: action.payload.selectedChoice };
    
    case 'RESET_ANSWERS':
      return {};
    
    default:
      return state;
  }
};

export const AnswerProvider = ({ children }: { children: ReactNode }) => {
  const [answers, dispatch] = useReducer(answerReducer, initialState);

  const handleSelect: HandleSelect = (questionId, choice) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { questionId, selectedChoice: choice },
    });

    // ブラウザのローカルストレージに保存
    const stored = localStorage.getItem("toeicAnswers");
    const parsed: Record<number, string> = stored ? JSON.parse(stored) : {};
    parsed[questionId] = choice;
    localStorage.setItem("toeicAnswers", JSON.stringify(parsed));
  };

  const resetAnswers = () => {
    dispatch({ type: 'RESET_ANSWERS' });
  };

  // 最初にブラウザのローカルストレージから読み込む
  useEffect(() => {
    const stored = localStorage.getItem("toeicAnswers");
    if (stored) {
      const parsed: Record<number, string> = JSON.parse(stored);
      Object.keys(parsed).forEach((id) => {
        const qid = Number(id);
        const choice = parsed[qid];
        dispatch({
          type: 'SET_ANSWER',
          payload: { questionId: qid, selectedChoice: choice },
        });
      });
    }
  }, []);

  return (
    <AnswerContext.Provider
      value={{ answers, handleSelect, resetAnswers }}
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
