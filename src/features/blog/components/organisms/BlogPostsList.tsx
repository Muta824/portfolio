import { BlogPostType } from "../../types/data";
import { BlogPost } from "../molecules/BlogPost";

export function BlogPostsList({ 
    posts, 
    isUserAdmin 
}: { 
    posts: BlogPostType[]; 
    isUserAdmin: boolean; 
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <BlogPost key={post.id} post={post} isUserAdmin={isUserAdmin} />
            ))}
        </div>
    );
}
