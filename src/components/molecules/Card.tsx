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
        'bg-white dark:bg-gray-900 rounded-lg shadow-md p-6',
        className
      )}
    >
      {children}
    </div>
  );
}; 