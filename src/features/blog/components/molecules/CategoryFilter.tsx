import { FC } from 'react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory?: string;
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !selectedCategory
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        すべて
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/blog/category/${category.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.slug
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}; 