// blog post query
export const blogPostQuery = {
    select: {
      id: true,
      title: true,
      slug: true,
      publishedAt: true,
      thumbnailUrl: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
          slug: true,
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
      slug: true,
    },
}