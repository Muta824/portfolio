import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { SignIn } from '@/components/atoms/signin-button';
import { SignOut } from '@/components/atoms/signout-button';
import UserAvatar from '@/components/atoms/UserAvatar';
import { auth } from '@/auth';

const links = [
    { href: '/', label: 'Home' },
    //{ href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#portfolio', label: 'Portfolio' },
    //{ href: '#contact', label: 'Contact' },
];

export const Navigation = async () => {
  const session = await auth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mx-auto px-4 bg-white dark:bg-gray-900 shadow-sm dark:border-b dark:border-gray-700">
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
    </nav>
  );
}; 