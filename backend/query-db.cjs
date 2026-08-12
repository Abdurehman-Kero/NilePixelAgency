const Database = require('better-sqlite3');
const db = new Database('./nilepixel.db');

db.prepare("UPDATE team_members SET photo = '/uploads/harun-1786351909814.jpg' WHERE name = 'Harun'").run();
db.prepare("UPDATE team_members SET photo = '/uploads/fuad-1786351909814.jpg' WHERE name = 'Fuad'").run();

const check = db.prepare("SELECT name, photo FROM team_members WHERE name IN ('Harun', 'Fuad')").all();
console.log(JSON.stringify(check, null, 2));
db.close();
