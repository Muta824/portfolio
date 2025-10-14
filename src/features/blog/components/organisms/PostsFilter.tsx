"use client";

import { useState } from "react";
import { BlogPostType, CategoryType } from "../../types/data";
import { BlogPostsList } from "./BlogPostsList";
import { CategoryTags } from "../molecules/CategoryTags";

export function PostsFilter({
    posts,
    categories,
    isUserAdmin,
}: {
    posts: BlogPostType[];
    categories: CategoryType[];
    isUserAdmin: boolean;
}) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // filter blog posts by category
    const filteredPosts = selectedCategory === "all"
        ? posts
        : posts.filter((post) => post.categories.some((category) => category.name === selectedCategory));

    return (
        <div>
            {/* category tags */}
            <CategoryTags
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            {/* filtered blog posts */}
            <BlogPostsList posts={filteredPosts} isUserAdmin={isUserAdmin} />
        </div>
    )
}