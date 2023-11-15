// api/controllers/authController.ts
import { Request, Response } from 'express';
import { loginService, registerService, refreshTokenService } from '../services/auth.services';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const result = await loginService(username, password);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const result = await registerService(username, password);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
        const result = await refreshTokenService(refreshToken);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
