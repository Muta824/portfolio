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
        'p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]',
        className
      )}
    >
      {children}
    </div>
  );
}; 