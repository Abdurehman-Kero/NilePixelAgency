import Database from 'better-sqlite3';
const db = new Database('./nilepixel.db');
// Check schema
const teamCols = db.prepare("PRAGMA table_info(team_members)").all();
const servicesCols = db.prepare("PRAGMA table_info(services)").all();
console.log('TEAM COLS:', teamCols.map(c => c.name).join(', '));
console.log('SERVICES COLS:', servicesCols.map(c => c.name).join(', '));

const team = db.prepare("SELECT id, name, position, photo FROM team_members WHERE status = 'active' ORDER BY display_order LIMIT 6").all();
const services = db.prepare("SELECT * FROM services ORDER BY display_order LIMIT 4").all();
console.log(JSON.stringify({ team, services }, null, 2));
db.close();
