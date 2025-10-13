import express from 'express';
import {
  registerUser,
  loginUser,
  listUsers,
  removeUser
} from '../controllers/userController.js';
import { authenticateJWT, requireStaff } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authenticateJWT, requireStaff, registerUser);
router.post('/login', loginUser);
router.get('/users', authenticateJWT, requireStaff, listUsers);
router.delete('/remove/:id', authenticateJWT, requireStaff, removeUser);

//router.post('/register', registerUser);
//router.get('/users', listUsers);
//router.delete('/remove/:id', removeUser);
export default router;
