"use server"

import prisma from "@/lib/prisma/prisma";
import { blogPostQuery, categoryQuery } from "@/lib/prisma/queries";
import { BlogPostType } from "./types/data";
import { revalidatePath } from "next/cache";

export async function getPosts(): Promise<BlogPostType[]> {
    const posts = await prisma.post.findMany(blogPostQuery)
    return posts
}

export async function getCategories() {
    const categories = await prisma.category.findMany(categoryQuery)
    return categories
}

export async function deletePost(slug: string) {
    try {
        await prisma.post.delete({
            where: { slug },
        })
        revalidatePath('/blog');
    } catch (error) {
        console.error('Delete error:', error);
        throw new Error('Failed to delete post');
    }
}