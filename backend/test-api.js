// native fetch

async function run() {
  const res = await fetch('http://localhost:3000/api/v1/settings');
  const data = await res.json();
  console.log('GET /settings:', JSON.stringify(data, null, 2));
}

run();
