import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.js';

export const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      throw new UnauthorizedError('Authentication required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      next(new UnauthorizedError('Insufficient permissions'));
      return;
    }
    next();
  };
};