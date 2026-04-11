import { defineConfig } from 'drizzle-kit'

const rawDatabaseUrl =
    process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG?.trim() ?? process.env.DATABASE_URL?.trim()

if (!rawDatabaseUrl) {
    throw new Error(
        'NEXT_PUBLIC_DATABASE_URL_CONFIG (or DATABASE_URL) is not set. Add it to your environment before running drizzle commands.'
    )
}

const databaseUrl = rawDatabaseUrl.replace('sslmode=require', 'sslmode=verify-full')

export default defineConfig({
    schema: './config/schema.js',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: databaseUrl,
    }
})