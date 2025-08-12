import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={twMerge(
        'p-6 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] border border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
}; 