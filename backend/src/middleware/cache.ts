import { Request, Response, NextFunction } from 'express';

// Simple in-memory cache
const apiCache = new Map<string, { data: any; expiry: number }>();

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Middleware to cache public GET routes.
 */
export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') {
    return next();
  }

  const key = req.originalUrl;
  const cachedResponse = apiCache.get(key);

  if (cachedResponse && cachedResponse.expiry > Date.now()) {
    return res.status(200).json(cachedResponse.data);
  }

  // Override res.json to intercept the response and cache it
  const originalJson = res.json.bind(res);
  res.json = (body: any) => {
    // Only cache successful responses
    if (res.statusCode === 200 && body.success !== false) {
      apiCache.set(key, {
        data: body,
        expiry: Date.now() + CACHE_DURATION
      });
    }
    return originalJson(body);
  };

  next();
};

/**
 * Clear the entire API cache. Call this when data is mutated.
 */
export const clearCache = () => {
  apiCache.clear();
  console.log('[Cache] API cache cleared.');
};
