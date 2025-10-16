import express from 'express';
import {
  registerUser,
  loginUser,
  listUsers,
  removeUser
} from '../controllers/userController.js';

import { authenticateJWT, requireStaff } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes — no token required
router.post('/register', registerUser); // Student or Staff registration
router.post('/login', loginUser);       // Login returns JWT

// Protected routes — require valid token and Staff role
router.get('/users', authenticateJWT, requireStaff, listUsers);       // List all users
router.delete('/remove/:id', authenticateJWT, requireStaff, removeUser); // Remove user by ID

export default router;