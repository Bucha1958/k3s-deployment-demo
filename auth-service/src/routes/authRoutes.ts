import express from 'express';
import { loginUser, profileUser, registerUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/profile', profileUser);

export default router;