"use client";

import { useState } from "react";
import { BlogPostType, CategoryType } from "../../types/data";
import { BlogPost } from "../molecules/BlogPost";
import { CategoryTags } from "../molecules/CategoryTags";

export function PostsFilter({
    posts,
    categories,
}: {
    posts: BlogPostType[];
    categories: CategoryType[];
}) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    const filteredPosts = selectedCategory === "all"
        ? posts
        : posts.filter((post) => post.category.name === selectedCategory);

    return (
        <div>
            <CategoryTags
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                    <BlogPost key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}