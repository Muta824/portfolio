import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Discord',
          content: 'https://pris.ly/discord',
          slug: 'join-prisma-discord',
          categoryId: '1',
          publishedAt: new Date(),
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
          slug: 'prisma-youtube',
          categoryId: '1',
          publishedAt: new Date(),
        },
      ],
    },
  },
  {
    name: 'Bob',
    email: 'bob@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          slug: 'follow-prisma-twitter',
          categoryId: '1',
          publishedAt: new Date(),
        },
      ],
    },
  }
]

const categoryData: Prisma.CategoryCreateInput[] = [
  {
    id: '1',
    name: '技術記事',
    slug: 'tech',
  },
];

export async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const c of categoryData) {
    const category = await prisma.category.create({
      data: c,
    });
    console.log(`Created category with id: ${category.id}`);
  }
  console.log(`Seeding finished.`)
}

main()