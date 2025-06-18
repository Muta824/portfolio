'use client';

import { useState, useEffect } from 'react';
import TodoList from '@/features/todo/components/organisms/TodoList';
import Calendar from '@/features/todo/components/organisms/Calendar';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import UsageGuideModal from '@/features/todo/components/organisms/UsageGuideModal';
import TimeZoneGuideModal from '@/features/todo/components/organisms/TimeZoneGuideModal';
import Button from '@/components/atoms/Button';
import { Task } from '@/features/todo/types/todo';

interface TodoTasks {
  [date: string]: Task[];
}

const getDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function TodoPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isTimeZoneGuideOpen, setIsTimeZoneGuideOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dateKey = getDateKey(selectedDate);
    const saved = localStorage.getItem('todoTasks');
    const todoTasks: TodoTasks = saved ? JSON.parse(saved) : {};
    setTasks(todoTasks[dateKey] || []);
  }, [selectedDate]);

  useEffect(() => {
    if (!mounted) return;
    
    const dateKey = getDateKey(selectedDate);
    const saved = localStorage.getItem('todoTasks');
    const todoTasks: TodoTasks = saved ? JSON.parse(saved) : {};
    todoTasks[dateKey] = tasks;
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
  }, [tasks, selectedDate, mounted]);

  const handleUpdateTask = (task: Task) => {
    setTasks(prev => {
      const existingTask = prev.find(t => t.id === task.id);
      if (existingTask) {
        return prev.map(t => t.id === task.id ? task : t);
      } else {
        return [...prev, task];
      }
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-6 px-1 sm:px-6">
      <UsageGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
      <TimeZoneGuideModal
        isOpen={isTimeZoneGuideOpen}
        onClose={() => setIsTimeZoneGuideOpen(false)}
      />
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-4 xl:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight md:text-5xl">
              {selectedDate.getFullYear()}年 {selectedDate.getMonth() + 1}月 {selectedDate.getDate()}日
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-4 sm:text-lg md:text-lg text-center">
              今日のタスクを管理しましょう
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center items-center space-x-6">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsTimeZoneGuideOpen(true)}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>このアプリについて</span>
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>使い方を見る</span>
            </Button>
            <ThemeToggle />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
              <TodoList 
                tasks={tasks}
                onUpdateTask={handleUpdateTask}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
