import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.ts';

export function createDb(connectionUrl?: string) {
  const url = connectionUrl ?? process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL not set');
  const queryClient = postgres(url);
  return drizzle(queryClient, { schema });
}

export type Database = ReturnType<typeof createDb>;
