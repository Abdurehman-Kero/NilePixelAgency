import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nilepixel_super_secret_jwt_key_2026';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role_id: number;
    uuid: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required. Please log in.',
      timestamp: new Date().toISOString()
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired access token.',
      timestamp: new Date().toISOString()
    });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role_id !== 1) {
    return res.status(403).json({
      success: false,
      message: 'Administrator permission required to perform this action.',
      timestamp: new Date().toISOString()
    });
  }
  next();
};
