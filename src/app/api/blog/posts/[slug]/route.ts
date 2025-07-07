import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

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
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
} 

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { title, content, category, tags } = data;

    const post = await prisma.post.update({
      where: { slug },
      data: { title,
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
        tags: {
          set: [],
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

    // ブログ一覧ページと記事詳細ページのキャッシュを無効化
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Failed to update post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await params;

    // 投稿を取得して権限をチェック
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { author: true },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // 投稿者または管理者のみ削除可能
    if (post.authorId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 投稿を削除
    await prisma.post.delete({
      where: { slug },
    });

    // ブログ一覧ページと記事詳細ページのキャッシュを無効化
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
} 