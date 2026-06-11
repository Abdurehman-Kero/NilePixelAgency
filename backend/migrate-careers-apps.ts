import { initDbConnection } from './src/config/database.js';

import fs from 'fs';
import path from 'path';

async function migrate() {
  console.log('Running careers and applications migrations...');
  const db = await initDbConnection();

  try {
    db.run(`ALTER TABLE careers ADD COLUMN telegram_username TEXT;`);
    console.log('Added telegram_username to careers table.');
  } catch (err: any) {
    if (err.message.includes('duplicate column name')) {
      console.log('Column telegram_username already exists in careers table.');
    } else {
      console.error('Error altering careers table:', err);
    }
  }

  try {
    db.run(`ALTER TABLE job_applications ADD COLUMN telegram_username TEXT;`);
    console.log('Added telegram_username to job_applications table.');
  } catch (err: any) {
    if (err.message.includes('duplicate column name')) {
      console.log('Column telegram_username already exists in job_applications table.');
    } else {
      console.error('Error altering job_applications table:', err);
    }
  }

  const dbPath = path.resolve(process.cwd(), 'nilepixel.db');
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
  console.log('Migration complete and saved.');
}

migrate();
