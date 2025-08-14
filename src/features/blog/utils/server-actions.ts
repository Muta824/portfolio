"use server"

import prisma from "@/lib/prisma/prisma";
import { blogPostQuery, categoryQuery } from "@/lib/prisma/queries";
import { BlogPostType } from "../types/data";

export async function getPosts(): Promise<BlogPostType[]> {
    const posts = await prisma.post.findMany(blogPostQuery)
    return posts
}

export async function getCategories() {
    const categories = await prisma.category.findMany(categoryQuery)
    return categories
}