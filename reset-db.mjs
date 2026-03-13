import pg from 'pg';
const { Client } = pg;
const client = new Client({
    connectionString: 'postgresql://neondb_owner:JjXVaRv26PKB@ep-jolly-bread-a5hdf74l.us-east-2.aws.neon.tech/hospital2?sslmode=require',
});
await client.connect();

// Drop all tables in the right order (patients first due to FK to doctors)
await client.query('DROP TABLE IF EXISTS patients CASCADE');
await client.query('DROP TABLE IF EXISTS doctors CASCADE');
await client.query('DROP TABLE IF EXISTS hospitals CASCADE');
console.log('All tables dropped');

await client.end();
