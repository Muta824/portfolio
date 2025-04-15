'use client';

import { twMerge } from 'tailwind-merge';

interface CalendarDayProps {
  day: number;
  isSelected: boolean;
  isToday: boolean;
  onClick: () => void;
  className?: string;
}

export default function CalendarDay({
  day,
  isSelected,
  isToday,
  onClick,
  className,
}: CalendarDayProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'h-10 flex items-center justify-center rounded-full text-gray-900 dark:text-white',
        isSelected
          ? 'bg-blue-600 text-white'
          : isToday
          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700',
        className
      )}
    >
      {day}
    </button>
  );
} 