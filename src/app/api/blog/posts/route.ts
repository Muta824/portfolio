import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '../../../../../auth';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
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
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { title, content, categoryId, tags } = data;

    // スラッグを生成
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // 記事を作成
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        categoryId,
        authorId: session.user.id,
        tags: {
          connectOrCreate: tags.map((tagName: string) => ({
            where: { slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
            create: {
              name: tagName,
              slug: tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            },
          })),
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}