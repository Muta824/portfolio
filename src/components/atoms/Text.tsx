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
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-semibold',
    body: 'text-base',
    small: 'text-sm text-gray-600'
  };

  const Component = variant.startsWith('h') ? variant : 'p';

  return (
    <Component className={twMerge(variants[variant], className)}>
      {children}
    </Component>
  );
}; 