"use server"

import prisma from "@/lib/prisma/prisma";
import { blogPostQuery, categoryQuery } from "@/lib/prisma/queries";
import { BlogPostType } from "./types/data";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function getPosts(): Promise<BlogPostType[]> {
    const posts = await prisma.post.findMany(blogPostQuery)
    return posts
}

export async function getCategories() {
    const categories = await prisma.category.findMany(categoryQuery)
    return categories
}

export async function getPost(slug: string) {
    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                category: true,
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
        return post
    } catch (error) {
        console.log("Failed to fetch the post", error)
        return null
    }
}

export async function createPost(request: Request) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const { title, content, category, tags } = data;

        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        const post = await prisma.post.create({
            data: {
                title,
                slug,
                content,
                category: {
                    connectOrCreate: {
                        where: { name: category },
                        create: {
                            name: category,
                            slug: category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        },
                    },
                },
                author: {
                    connect: { id: session.user.id },
                },
                tags: {
                    // タグが存在しない場合は作成, 存在する場合は紐づけ
                    connectOrCreate: tags.map((tagName: string) => ({
                        // タグのスラッグが存在するかを確認
                        where: { slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
                            // 存在しない場合は作成
                            create: {
                                name: tagName,
                                slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                            },
                    })),
                },
            },
        });
        revalidatePath('/blog');
        revalidatePath(`/blog/${slug}`);

        return NextResponse.json(post, { status: 201 });
    } catch(error) {
        console.error('Failed to create post:', error);
        return NextResponse.json(
            { error: 'Failed to create post' },
            { status: 500 }
        );
    }
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