import express from 'express';
import {
  registerUser,
  loginUser,
  listUsers,
  removeUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', listUsers);
router.delete('/remove/:id', removeUser);

export default router;
