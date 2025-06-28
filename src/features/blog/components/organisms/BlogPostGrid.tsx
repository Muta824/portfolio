'use client';

import { FC, useState, useEffect } from 'react';
import { BlogPostCard } from '../molecules/BlogPostCard';
import { CategoryFilter } from '../molecules/CategoryFilter';
import { BlogPost, Category } from '@/features/blog/types/data';

interface BlogPostGridProps {
  initialPosts: BlogPost[];
}

export const BlogPostGrid: FC<BlogPostGridProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // カテゴリーを取得
    fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'http://localhost:3000'}/api/blog/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filteredPosts = initialPosts.filter(post => post.category.slug === selectedCategory);
      setPosts(filteredPosts);
    } else {
      setPosts(initialPosts);
    }
  }, [selectedCategory, initialPosts]);

  const handleCategoryChange = (categorySlug?: string) => {
    setSelectedCategory(categorySlug);
  };

  return (
    <>
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: BlogPost) => (
          <BlogPostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}; 