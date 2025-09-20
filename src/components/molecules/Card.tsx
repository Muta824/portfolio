import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Card = ({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
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