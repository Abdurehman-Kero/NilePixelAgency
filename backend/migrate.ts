import { run } from './src/config/database.js';

async function migrate() {
  console.log('Running migration...');
  try {
    await run(`ALTER TABLE careers ADD COLUMN expire_date DATETIME`);
    console.log('Added expire_date to careers successfully.');
  } catch (err: any) {
    if (err.message && err.message.includes('duplicate column name')) {
      console.log('expire_date already exists.');
    } else {
      console.error('Migration error:', err);
    }
  }
}

migrate();
