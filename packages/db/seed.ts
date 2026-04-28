import { createDb } from './src/client.ts';
import { articles } from './src/schema.ts';

const db = createDb();

const sample = [
  {
    title: 'Welcome to Meetup CMS',
    slug: 'welcome-to-meetup-cms',
    excerpt: 'A throwaway demo CMS used in our specs-to-production presentation.',
    content: 'This is the seed article.\n\nIt is published.',
    status: 'published' as const,
    publishedAt: new Date('2026-04-01T10:00:00Z'),
  },
  {
    title: 'Why we chose a multirepo workflow',
    slug: 'why-multirepo',
    excerpt: 'Three role-shaped repos, one unified board.',
    content: 'The full story is in our presentation.',
    status: 'published' as const,
    publishedAt: new Date('2026-04-15T10:00:00Z'),
  },
  {
    title: 'Draft: Article scheduling design notes',
    slug: 'draft-scheduling',
    excerpt: 'Internal-only thinking about article scheduling.',
    content: 'Not published yet.',
    status: 'draft' as const,
    publishedAt: null,
  },
];

console.log('[seed] inserting', sample.length, 'articles…');
await db.insert(articles).values(sample).onConflictDoNothing();
console.log('[seed] done');
process.exit(0);
