"use client"

import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { deletePost } from "../../server-actions";

export function EllipsisButton({ slug }: { slug: string }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        await deletePost(slug);
        setIsOpen(false);
    }

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 absolute top-0 right-0"
            >
                <EllipsisVertical className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
            {isOpen && (
                <div className="absolute top-10 right-0 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <Link 
                        href={`/blog/edit/${slug}`} 
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Edit
                    </Link>
                    <button 
                        onClick={handleDelete} 
                        className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 dark:text-red-400"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}