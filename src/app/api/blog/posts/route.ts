import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

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
    // JSONを入力として受け取り、それを解釈してJavaScriptのオブジェクトに変換
    const data = await request.json();
    const { title, content, category, tags } = data;

    // タイトルのスラッグを生成
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

    // ブログ一覧ページと記事詳細ページのキャッシュを無効化
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}