import { getPool, query } from './db';

async function testDatabaseConnection() {
  console.log('Testing database connection...');
  
  try {
    // Test connection
    const pool = await getPool();
    console.log('✅ Successfully connected to the database');

    // Test simple query
    const result = await query<{ now: Date }>('SELECT NOW()');
    console.log('✅ Successfully executed test query');
    console.log('Current database time:', result[0].now);

    // Test contact_submissions table
    const tableCheck = await query<{ exists: boolean }>(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'contact_submissions'
      )`
    );
    
    if (tableCheck[0].exists) {
      console.log('✅ contact_submissions table exists');
      
      // Test table structure
      const columns = await query<{ column_name: string }>(
        `SELECT column_name 
         FROM information_schema.columns 
         WHERE table_name = 'contact_submissions'`
      );
      console.log('Table columns:', columns.map(c => c.column_name).join(', '));

      // Check if phone_number column exists
      if (!columns.some(c => c.column_name === 'phone_number')) {
        console.log('Adding phone_number column...');
        await query(`
          ALTER TABLE contact_submissions 
          ADD COLUMN phone_number VARCHAR(50)
        `);
        console.log('✅ phone_number column added');
      }
    } else {
      console.log('❌ contact_submissions table does not exist');
      console.log('Creating table...');
      
      await query(`
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          company VARCHAR(255) NOT NULL,
          role VARCHAR(255) NOT NULL,
          interest VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          phone_number VARCHAR(50),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          status VARCHAR(50) DEFAULT 'pending',
          processed_at TIMESTAMP WITH TIME ZONE
        )
      `);
      console.log('✅ contact_submissions table created');
    }

    // Close the pool
    await pool.end();
    console.log('✅ Successfully closed database connection');
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  }
}

// Run the test
testDatabaseConnection().catch(console.error); 