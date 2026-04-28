export interface CreateArticleDto {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  status?: 'draft' | 'published';
}

export interface UpdateArticleDto {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  status?: 'draft' | 'published';
}
