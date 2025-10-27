"use server"

import prisma from "@/lib/prisma/prisma";
import { blogPostQuery, categoryQuery } from "@/lib/prisma/queries";
import { BlogPostType, CategoryType } from "./types/data";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { auth } from "@/auth";

export const getPosts = unstable_cache(async (): Promise<BlogPostType[]> => {
    const posts = await prisma.post.findMany(blogPostQuery);
    return posts;
}, ['posts'], { tags: ['posts'] });

export const getCategories = unstable_cache(async (): Promise<CategoryType[]> => {
    const categories = await prisma.category.findMany(categoryQuery);
    return categories;
}, ['categories'], { tags: ['categories'] });

export async function getPost(slug: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                categories: true,
                tags: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            }
        })
        return post;
    } catch (error) {
        console.log("Failed to fetch the post", error);
        return null;
    }
}

export async function createPost(formData: FormData) {
    const session = await auth();
    if (session?.user?.role !== "admin") {
        throw new Error('Unauthorized');
    }
    try {

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const categoryString = formData.get('category') as string;
        const tagsString = formData.get('tags') as string;
        
        // カンマ区切りの文字列を配列に変換
        const categories = categoryString
            .split(',')
            .map(category => category.trim())
            .filter(category => category.length > 0);

        // カンマ区切りの文字列を配列に変換
        const tags = tagsString
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        await prisma.post.create({
            data: {
                title,
                slug,
                content,
                categories: {
                    connectOrCreate: categories.map((categoryName: string) => ({
                        where: { name: categoryName },
                        create: {
                            name: categoryName,
                        },
                    })),
                },
                author: {
                    connect: { id: session.user.id },
                },
                tags: {
                    // タグが存在しない場合は作成, 存在する場合は紐づけ
                    connectOrCreate: tags.map((tagName: string) => ({
                        // タグのスラッグが存在するかを確認
                        where: { name: tagName },
                        create: {
                            name: tagName,
                        },
                    })),
                },
            },
        });

        revalidatePath('/blog');
        revalidatePath(`/blog/${slug}`);
        revalidateTag('posts');
        revalidateTag('categories');
    } catch(error) {
        console.error('Failed to create post:', error);
        throw error;
    }
}

export async function updatePost(formData: FormData) {
    const session = await auth();
    if (session?.user?.role !== "admin") {
        throw new Error('Unauthorized');
    }
    try {
        const slug = formData.get('slug') as string;
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const categoryString = formData.get('category') as string;
        const tagsString = formData.get('tags') as string;
        
        // カンマ区切りの文字列を配列に変換
        const categories = categoryString
            .split(',')
            .map(category => category.trim())
            .filter(category => category.length > 0);

        // カンマ区切りの文字列を配列に変換
        const tags = tagsString
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        await prisma.post.update({
            where: { slug },
            data: {
                title,
                content,
                categories: {
                    connectOrCreate: categories.map((categoryName: string) => ({
                        where: { name: categoryName },
                        create: {
                            name: categoryName,
                        },
                    })),
                },
                tags: {
                    connectOrCreate: tags.map((tagName: string) => ({
                        where: { name: tagName },
                        create: {
                            name: tagName,
                        },
                    })),
                },
            },
        });

        revalidatePath('/blog');
        revalidatePath(`/blog/${slug}`);
        revalidateTag('posts');
        revalidateTag('categories');
    } catch (error) {
        console.error('Failed to update post:', error);
        throw error;
    }
}

export async function deletePost(slug: string) {
    const session = await auth();
    if (session?.user?.role !== "admin") {
        throw new Error('Unauthorized');
    }
    try {

        await prisma.post.delete({
            where: { slug },
        })
        revalidatePath('/blog');
        revalidateTag('posts');
        revalidateTag('categories');
    } catch (error) {
        console.error('Delete error:', error);
        throw new Error('Failed to delete post');
    }
}