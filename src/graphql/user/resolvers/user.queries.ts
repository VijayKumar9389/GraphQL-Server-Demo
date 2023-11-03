import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginInput } from '../dtos/user.dtos';
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

function generateAccessToken(user: User) {
    return jwt.sign({ user }, 'secret', { expiresIn: '5m' });
}

const userQueries = {
        getUsers: async (parent: any, args: any, context: any) => {
            try {
                const users = await prisma.user.findMany();
                return users;
            } catch (error: any) {
                throw new Error(error.message);
            }
        },
};

export default userQueries;
