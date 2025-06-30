"use client";

import { FC, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { BlogPost } from '@/features/blog/types/data';
import { Card } from '@/components/molecules/Card';

interface BlogPostCardProps extends BlogPost {
  onEdit?: (post: BlogPost) => void;
  onDelete?: (postId: string) => void;
  showActions?: boolean;
}

export const BlogPostCard: FC<BlogPostCardProps> = ({
  id,
  title,
  publishedAt,
  category,
  tags,
  slug,
  onEdit,
  onDelete,
  showActions = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const publishedDate = new Date(publishedAt);

  // 外側をクリックしたときにメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.({ id, title, publishedAt, category, tags, slug });
    setIsMenuOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('この記事を削除しますか？')) {
      onDelete?.(slug);
    }
    setIsMenuOpen(false);
  };

  return (
    <Card>
      <div className="relative">
        <Link href={`/blog/${slug}`} className="block">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {/* カテゴリと日付 */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {category.name}
                </span>
                <time dateTime={publishedDate.toISOString()}>
                  {formatDate(publishedDate)}
                </time>
              </div>

              {/* 編集と削除 */}
              {showActions && (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsMenuOpen(!isMenuOpen);
                    }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute right-0 top-8 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg min-w-[120px]">
                      <button
                        onClick={handleEdit}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        編集
                      </button>
                      <button
                        onClick={handleDelete}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        削除
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* タイトル */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>

            {/* タグ */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </Link>
      </div>
    </Card>
  );
}; 