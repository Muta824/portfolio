export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    publishedAt: Date;
    thumbnailUrl: string | null;
    category: Category;
    tags: Tag[];
  }

  export interface Category {
    id: string;
    name: string;
    slug: string;
  }

  export interface Tag {
    id: string;
    name: string;
    slug: string;
  }