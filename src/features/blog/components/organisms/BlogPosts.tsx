import { getCategories, getPosts } from "@/features/blog/server-actions";
import { PostsFilter } from "./PostsFilter";
import { auth } from "@/auth";

export async function BlogPosts() {
    const [posts, categories] = await Promise.all([
        getPosts(),
        getCategories(),
    ]);
    const session = await auth();

    const isUserAdmin = session?.user?.role === "admin";

    return (
        <PostsFilter posts={posts} categories={categories} isUserAdmin={isUserAdmin} />
    )
}