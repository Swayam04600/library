import express from 'express';
import { body } from 'express-validator';
import { login, logout, getMe, register } from '../controllers/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    body('role').isIn(['admin', 'member']).withMessage('Invalid role')
  ],
  validateRequest,
  login
);

router.post('/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required')
  ],
  validateRequest,
  register
);

router.post('/logout', logout);
router.get('/me', auth, getMe);

export default router;