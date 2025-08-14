'use client';

import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPostCard } from '../molecules/BlogPostCard';
import { CategoryFilter } from '../molecules/CategoryTags';
import { SearchBar } from '../molecules/SearchBar';
import { BlogPost, Category } from '@/features/blog/types/data';

interface BlogPostGridProps {
  posts: BlogPost[];
  categories: Category[];
  isUser?: boolean;
}

export const BlogPostGrid: FC<BlogPostGridProps> = ({ 
  posts, 
  categories, 
  isUser 
}) => {
  const router = useRouter();
  const [statePosts, setStatePosts] = useState<BlogPost[]>(posts);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>(posts);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  // 検索とカテゴリーフィルターを組み合わせた処理
  useEffect(() => {
    let filteredPosts = posts;

    // カテゴリーフィルター
    if (selectedCategory) {
      filteredPosts = filteredPosts.filter(post => post.category.slug === selectedCategory);
    }

    // 検索フィルター
    if (searchQuery.trim()) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedPosts(filteredPosts);
  }, [selectedCategory, searchQuery, posts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categorySlug?: string) => {
    setSelectedCategory(categorySlug);
  };

  const handleEdit = (post: BlogPost) => {
    router.push(`/blog/edit/${post.slug}`);
  };

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/blog/posts/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // 削除成功後、投稿リストを更新
        const updatedPosts = statePosts.filter(post => post.slug !== slug);
        setStatePosts(updatedPosts);
        setDisplayedPosts(displayedPosts.filter(post => post.slug !== slug));
      } else {
        alert('削除に失敗しました');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('削除に失敗しました');
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {searchQuery && displayedPosts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            「{searchQuery}」を含むタイトルの記事が見つかりませんでした。
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post: BlogPost) => (
          <BlogPostCard 
            key={post.id} 
            post={post}
            showActions={!!isUser}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}; 