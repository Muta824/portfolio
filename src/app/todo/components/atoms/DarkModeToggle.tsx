'use client';

import { useState, useEffect } from 'react';
import Button from './Button';

interface DarkModeToggleProps {
  className?: string;
}

export default function DarkModeToggle({ className }: DarkModeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === null ? prefersDark : saved === 'true';
  
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleDarkMode}
      className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-0 dark:opacity-100 transition-opacity duration-300 rounded-lg`} />
      <div className="relative flex items-center justify-center p-1">
        <div className={`absolute inset-0 bg-white dark:bg-transparent rounded-lg transition-all duration-300 ${isDarkMode ? 'scale-0' : 'scale-100'}`} />
        <div className="relative flex items-center justify-center w-8 h-8">
          {isDarkMode ? (
            <svg 
              className="w-10 h-10 text-white transform transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
              />
            </svg>
          ) : (
            <svg 
              className="w-10 h-10 text-gray-700 transform transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
              />
            </svg>
          )}
        </div>
      </div>
    </Button>
  );
} 
