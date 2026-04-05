const { neon } = require('@neondatabase/serverless');

async function createTable() {
  const sql = neon(process.env.POSTGRES_URL);

  try {
    console.log('Creating newsletter_subscribers table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP DEFAULT NOW()
      );
    `;

    console.log('✅ Table created successfully!');
    console.log('You can now use the newsletter feature.');
  } catch (error) {
    console.error('❌ Error creating table:', error);
    process.exit(1);
  }
}

createTable();
