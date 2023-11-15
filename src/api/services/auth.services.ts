// api/services/authService.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const loginService = async (username: string, password: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            throw new Error('User does not exist');
        }

        const passwordMatch: boolean = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }

        const token = generateAccessToken(user);
        const refreshToken = jwt.sign({ user }, 'secret', { expiresIn: '12hr' });

        console.log(`${user.username} successfully logged in`);

        return {
            auth: true,
            accessToken: token,
            refreshToken: refreshToken,
            user: user.username,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const registerService = async (username: string, password: string) => {
    try {
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user in the database
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        return user;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const refreshTokenService = async (refreshToken: string) => {
    try {
        const token = jwt.decode(refreshToken) as jwt.JwtPayload | null;

        if (!token) {
            throw new Error('Invalid token');
        }

        const user = {
            id: token?.id as number,
            isAdmin: token?.isAdmin as boolean,
            username: token?.username as string,
            password: '',
        };

        const accessToken = generateAccessToken(user);

        return {
            auth: true,
            accessToken: accessToken,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const generateAccessToken = (user: any) => {
    // Implement your logic to generate an access token
    return 'your_generated_access_token';
};
