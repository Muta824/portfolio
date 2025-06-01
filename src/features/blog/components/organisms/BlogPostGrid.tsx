import { FC } from 'react';
import { BlogPostCard } from '../molecules/BlogPostCard';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
  slug: string;
}

interface BlogPostGridProps {
  posts: BlogPost[];
}

export const BlogPostGrid: FC<BlogPostGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogPostCard key={post.id} {...post} />
      ))}
    </div>
  );
}; 