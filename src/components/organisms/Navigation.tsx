import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  className = '',
}) => {
  const links = [
    { href: '/', label: 'ホーム' },
    { href: '/toeic', label: 'TOEIC' },
    { href: '/todo', label: 'Todo' },
    { href: '/blog', label: 'ブログ' },
  ];

  return (
    <nav className={twMerge('bg-white shadow-sm', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}; 