import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';

import { initDatabase } from './src/config/database.js';
import apiRoutes from './src/routes/index.js';
import { errorHandler } from './src/middleware/errorHandler.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable CORS & JSON Parsing
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Initialize Database
  await initDatabase();

  // Static uploads directory
  const uploadsPath = path.resolve(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadsPath));

  // Mount API V1 Routes
  app.use('/api/v1', apiRoutes);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Global error handler
  app.use(errorHandler);

  // Serve static files in production if needed, or rely on separate frontend hosting
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(process.cwd(), '../frontend/dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NilePixel Platform Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
