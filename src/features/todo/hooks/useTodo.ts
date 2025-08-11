import { useCallback } from 'react';
import { Task } from '../types/todo';
import { useTodo as useTodoContext } from '../contexts/TodoContext';

export function useTodo() {
  const { tasks, addTask, updateTask, deleteTask, getTasksByDate } = useTodoContext();

  const handleAddTask = useCallback((task: Task) => {
    addTask(task);
  }, [addTask]);

  const handleUpdateTask = useCallback((task: Task) => {
    updateTask(task);
  }, [updateTask]);

  const handleDeleteTask = useCallback((id: string) => {
    deleteTask(id);
  }, [deleteTask]);

  const handleGetTasksByDate = useCallback((date: Date) => {
    return getTasksByDate(date);
  }, [getTasksByDate]);

  return {
    tasks,
    addTask: handleAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    getTasksByDate: handleGetTasksByDate,
  };
} 