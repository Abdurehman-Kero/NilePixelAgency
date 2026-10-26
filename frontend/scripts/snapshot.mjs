// Saves the current public API data into src/data/snapshot.json.
// The site renders this instantly on first load, then refreshes from the live API.
// Run it before a deploy:  npm run snapshot
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const API = process.env.API_URL || 'https://nilepixel-backend.onrender.com/api/v1';
const KEYS = ['/settings', '/projects', '/testimonials', '/careers', '/blog'];

const out = {};
for (const key of KEYS) {
  try {
    const res = await fetch(API + key, { signal: AbortSignal.timeout(90_000) });
    const json = await res.json();
    if (json?.success && json.data != null) out[key] = json.data;
    else console.warn(`skipped ${key}: unexpected response`);
  } catch (err) {
    console.warn(`skipped ${key}: ${err.message}`);
  }
}

const target = fileURLToPath(new URL('../src/data/snapshot.json', import.meta.url));
await writeFile(target, JSON.stringify(out, null, 2) + '\n');
console.log(`snapshot written with ${Object.keys(out).length}/${KEYS.length} endpoints`);
