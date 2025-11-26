import { Prisma } from "@prisma/client";
import { blogPostQuery, categoryQuery, tagQuery } from "@/lib/prisma/queries";

export type BlogPostType = Prisma.PostGetPayload<typeof blogPostQuery>;
export type CategoryType = Prisma.CategoryGetPayload<typeof categoryQuery>;
export type TagType = Prisma.TagGetPayload<typeof tagQuery>;

