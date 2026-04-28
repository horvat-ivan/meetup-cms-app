import { createDb, type Database } from '@meetup-cms/db';

export const DB_TOKEN = 'DB_TOKEN';

export const dbProvider = {
  provide: DB_TOKEN,
  useFactory: (): Database => {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is required');
    return createDb(url);
  },
};
