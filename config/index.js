import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const parseDatabaseUrl = (value) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.replace(/^"(.*)"$/, '$1');
};

const rawDatabaseUrl = parseDatabaseUrl(process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG) || parseDatabaseUrl(process.env.NEON_DATABASE_URL);

if (!rawDatabaseUrl) {
  throw new Error('DATABASE_URL or NEON_DATABASE_URL is required to connect to the database.');
}

try {
  new URL(rawDatabaseUrl);
} catch (error) {
  throw new Error(
    `Invalid database URL provided in environment: ${error instanceof Error ? error.message : String(error)}`
  );
}

const sql = neon(rawDatabaseUrl);
export const db = drizzle(sql, { schema });