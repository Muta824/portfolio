import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small';
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  className = '',
}) => {
  const variants = {
    h1: 'text-4xl font-bold text-gray-800 dark:text-white',
    h2: 'text-3xl font-bold text-gray-800 dark:text-white',
    h3: 'text-2xl font-semibold text-gray-800 dark:text-white',
    h4: 'text-xl font-semibold text-gray-800 dark:text-white',
    body: 'text-base text-gray-800 dark:text-white',
    small: 'text-sm text-gray-600 dark:text-gray-400'
  };

  const Component = variant.startsWith('h') ? variant : 'p';

  return (
    <Component className={twMerge(variants[variant], className)}>
      {children}
    </Component>
  );
}; 