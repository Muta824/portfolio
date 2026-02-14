import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card = ({
    children,
    className = '',
    onClick,
}: CardProps) => {
    return (
        <div
            className={twMerge(
                'p-6 rounded-lg shadow-md overflow-hidden transition-transform border border-gray-200 dark:border-white',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}; 