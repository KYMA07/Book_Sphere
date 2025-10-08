import express from 'express';
import {
  registerUser,
  loginUser,
  listUsers,
  removeUser
} from '../controllers/userController.js';
import { authenticateJWT, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authenticateJWT, requireRole('Admin'), registerUser);
router.post('/login', loginUser);
router.get('/users', authenticateJWT, requireRole('Admin'), listUsers);
router.delete('/remove/:id', authenticateJWT, requireRole('Admin'), removeUser);

//router.post('/register', registerUser);
//router.get('/users', listUsers);
//router.delete('/remove/:id', removeUser);
export default router;
