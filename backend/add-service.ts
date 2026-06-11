import { run } from './src/config/database.js';
import crypto from 'crypto';

async function addService() {
  try {
    const uuid = crypto.randomUUID();
    const title = 'Telegram Bots & Mini Apps';
    const slug = 'telegram-bots';
    const short_description = 'Helping Businesses Build Telegram Bots, Mini Apps & Automation Systems';
    const icon = 'MessageCircle';
    const image = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80';

    await run(`
      INSERT INTO services (uuid, title, slug, short_description, icon, image, display_order)
      VALUES (?, ?, ?, ?, ?, ?, 99)
    `, [uuid, title, slug, short_description, icon, image]);

    console.log('Successfully added Telegram Bots service to database!');
  } catch (error) {
    console.error('Error adding service:', error);
  }
}

addService();
