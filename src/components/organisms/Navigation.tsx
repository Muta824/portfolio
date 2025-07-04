import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { SignIn } from '@/components/atoms/signin-button';
import { SignOut } from '@/components/atoms/signout-button';
import UserAvatar from '@/components/atoms/UserAvatar';
import { auth } from '@/auth';

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = async ({
  className = '',
}) => {
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/toeic', label: 'TOEIC' },
    { href: '/todo', label: 'Todo' },
    { href: '/blog', label: 'Blog' },
  ];

  const session = await auth();

  return (
    <nav className={twMerge('bg-white dark:bg-gray-900 shadow-sm', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <UserAvatar />
            {session ? <SignOut /> : <SignIn />}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}; 