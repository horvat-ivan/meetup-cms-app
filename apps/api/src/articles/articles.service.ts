import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { articles, type Database, type Article, type NewArticle } from '@meetup-cms/db';
import { DB_TOKEN } from '../db/db.provider';
import type { CreateArticleDto, UpdateArticleDto } from './articles.dto';

@Injectable()
export class ArticlesService {
  constructor(@Inject(DB_TOKEN) private readonly db: Database) {}

  async list(): Promise<Article[]> {
    return this.db.select().from(articles).orderBy(desc(articles.createdAt));
  }

  async getById(id: string): Promise<Article> {
    const rows = await this.db.select().from(articles).where(eq(articles.id, id)).limit(1);
    if (!rows[0]) throw new NotFoundException(`Article ${id} not found`);
    return rows[0];
  }

  async getBySlug(slug: string): Promise<Article> {
    const rows = await this.db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
    if (!rows[0]) throw new NotFoundException(`Article ${slug} not found`);
    return rows[0];
  }

  async create(dto: CreateArticleDto): Promise<Article> {
    const newArticle: NewArticle = {
      title: dto.title,
      slug: dto.slug,
      excerpt: dto.excerpt ?? '',
      content: dto.content ?? '',
      status: dto.status ?? 'draft',
      publishedAt: dto.status === 'published' ? new Date() : null,
    };
    const [row] = await this.db.insert(articles).values(newArticle).returning();
    return row;
  }

  async update(id: string, dto: UpdateArticleDto): Promise<Article> {
    const existing = await this.getById(id);
    const updates: Partial<NewArticle> = { updatedAt: new Date() };
    if (dto.title !== undefined) updates.title = dto.title;
    if (dto.slug !== undefined) updates.slug = dto.slug;
    if (dto.excerpt !== undefined) updates.excerpt = dto.excerpt;
    if (dto.content !== undefined) updates.content = dto.content;
    if (dto.status !== undefined) {
      updates.status = dto.status;
      if (dto.status === 'published' && !existing.publishedAt) {
        updates.publishedAt = new Date();
      }
    }
    const [row] = await this.db
      .update(articles)
      .set(updates)
      .where(eq(articles.id, id))
      .returning();
    return row;
  }

  async remove(id: string): Promise<void> {
    await this.db.delete(articles).where(eq(articles.id, id));
  }
}
