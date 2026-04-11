import { defineConfig } from 'drizzle-kit'

const rawDatabaseUrl =
    process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG?.trim() ?? "postgresql://neondb_owner:npg_kUvx9V8WfKGu@ep-orange-haze-adf0c4ab-pooler.c-2.us-east-1.aws.neon.tech/hospital?sslmode=require&channel_binding=require"

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