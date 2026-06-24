import { initDbConnection, run, getOne } from './src/config/database.js';

async function test() {
  await initDbConnection();
  
  // Try to update phone
  await run('UPDATE company_information SET phone = ? WHERE id = 1', ['+251 000 000 000']);
  
  const res = await getOne('SELECT phone FROM company_information WHERE id = 1');
  console.log('Result after update:', res);
}

test();
