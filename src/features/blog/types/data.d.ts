export interface BlogPost {
    id: string;
    title: string;
    publishedAt: Date;
    category: Category;
    tags: Tag[];
    slug: string;
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