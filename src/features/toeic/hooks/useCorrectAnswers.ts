import { useState, useEffect, useCallback } from 'react';

interface UseCorrectAnswersReturn {
  answers: Record<number, string>;
  name: string;
  savedAnswers: Record<string, Record<number, string>>;
  setName: (name: string) => void;
  handleAnswerChange: (questionId: number, answer: string) => void;
  handleSave: () => void;
  handleDelete: (name: string) => void;
  handleEdit: (name: string) => void;
}

export const useCorrectAnswers = (): UseCorrectAnswersReturn => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [name, setName] = useState('');
  const [savedAnswers, setSavedAnswers] = useState<Record<string, Record<number, string>>>({});

  useEffect(() => {
    const storedAnswers = localStorage.getItem('correctAnswers');
    if (storedAnswers) {
      const parsedAnswers = JSON.parse(storedAnswers);
      setSavedAnswers(parsedAnswers);
    }
  }, []);

  const handleAnswerChange = useCallback((questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  }, []);

  const handleSave = useCallback(() => {
    if (!name) return;
    
    const newSavedAnswers = {
      ...savedAnswers,
      [name]: answers
    };
    
    setSavedAnswers(newSavedAnswers);
    localStorage.setItem('correctAnswers', JSON.stringify(newSavedAnswers));
    setName('');
    setAnswers({});
  }, [name, answers, savedAnswers]);

  const handleDelete = useCallback((nameToDelete: string) => {
    const newSavedAnswers = { ...savedAnswers };
    delete newSavedAnswers[nameToDelete];
    setSavedAnswers(newSavedAnswers);
    localStorage.setItem('correctAnswers', JSON.stringify(newSavedAnswers));
  }, [savedAnswers]);

  const handleEdit = useCallback((nameToEdit: string) => {
    setName(nameToEdit);
    setAnswers(savedAnswers[nameToEdit]);
  }, [savedAnswers]);

  return {
    answers,
    name,
    savedAnswers,
    setName,
    handleAnswerChange,
    handleSave,
    handleDelete,
    handleEdit
  };
};
