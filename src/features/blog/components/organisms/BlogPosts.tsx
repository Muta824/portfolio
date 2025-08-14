import { getCategories, getPosts } from "@/features/blog/utils/server-actions";
import { PostsFilter } from "./PostsFilter";

export async function BlogPosts() {
    const [posts, categories] = await Promise.all([
        getPosts(),
        getCategories(),
    ]);

    return (
        <PostsFilter posts={posts} categories={categories} />
    )
}