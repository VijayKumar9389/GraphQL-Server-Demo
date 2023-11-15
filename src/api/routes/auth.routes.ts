// api/routes/authRoutes.ts
import express, {Router} from 'express';
import { login, register, refreshToken } from '../controllers/auth.controllers';

const router : Router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/refresh-token', refreshToken);

export default router;
