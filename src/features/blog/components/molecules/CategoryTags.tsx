import { CategoryType } from '@/features/blog/types/data';
import { Dispatch, SetStateAction } from 'react';

export const CategoryTags = ({
    categories,
    selectedCategory,
    onCategoryChange,
}: {
    categories: CategoryType[];
    selectedCategory: string;
    onCategoryChange: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <button
                onClick={() => onCategoryChange("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.name
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}; 