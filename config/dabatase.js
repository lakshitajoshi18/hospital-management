import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG,
});

async function keepAlive() {
  await client.connect();
  await client.query('SELECT 1');
  console.log('DB is awake');
  await client.end();
}

setInterval(keepAlive, 5 * 60 * 1000); // every 5 minutes