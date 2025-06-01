import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { title, content, excerpt, categoryId, tags } = data;

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
        excerpt,
        categoryId,
        authorId: parseInt(session.user.id),
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

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}