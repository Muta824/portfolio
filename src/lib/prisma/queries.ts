// blog post query
export const blogPostQuery = {
    select: {
      id: true,
      title: true,
      slug: true,
      publishedAt: true,
      thumbnailUrl: true,
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc" as const,
    },
}

// category query
export const categoryQuery = {
    select: {
      id: true,
      name: true,
    },
}

// TagTypeを追加
export const tagQuery = {
  select: {
      id: true,
      name: true,
  },
}