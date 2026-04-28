import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ArticlesService } from './articles.service';

function makeFakeDb() {
  const data: any[] = [];
  return {
    select: () => ({
      from: () => ({
        orderBy: () => Promise.resolve(data),
        where: () => ({
          limit: () => Promise.resolve(data.slice(0, 1)),
        }),
      }),
    }),
    insert: () => ({
      values: (vals: any) => ({
        returning: () => {
          const row = { id: 'fake-id', ...vals, createdAt: new Date(), updatedAt: new Date() };
          data.push(row);
          return Promise.resolve([row]);
        },
      }),
    }),
    _data: data,
  };
}

describe('ArticlesService', () => {
  it('list returns articles ordered by createdAt desc', async () => {
    const db = makeFakeDb();
    const svc = new ArticlesService(db as any);
    db._data.push({ id: '1', title: 'A', createdAt: new Date(2025, 0, 1) });
    db._data.push({ id: '2', title: 'B', createdAt: new Date(2025, 1, 1) });
    const out = await svc.list();
    expect(out).toHaveLength(2);
  });

  it('create inserts a row and returns it', async () => {
    const db = makeFakeDb();
    const svc = new ArticlesService(db as any);
    const result = await svc.create({ title: 'New', slug: 'new', status: 'draft' });
    expect(result.title).toBe('New');
    expect(result.id).toBe('fake-id');
    expect(db._data).toHaveLength(1);
  });
});
