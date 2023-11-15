import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import {LoginInput} from "../../models/user.models";
import jwt, { JwtPayload } from 'jsonwebtoken';

const prisma = new PrismaClient();

function generateAccessToken(user: any) {
    return jwt.sign({ user }, 'secret', { expiresIn: '5m' });
}

const userMutations = {

    login: async (parent: any, args: { input: LoginInput }, context: any) => {

        const { username, password } = args.input;
        try {
            const user = await prisma.user.findUnique({
                where: { username },
            });

            if (!user) {
                throw new Error('User does not exist');
            }

            const passwordMatch : boolean = await bcrypt.compare(password, user.password);

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
    },

    register: async (parent: any, args: { input: { username: string; password: string } }, context: any) => {
        const { username, password } = args.input;

        // Hash the password
        const saltRounds = 10; // You can adjust the salt rounds as needed
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user in the database
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        return user;
    },

    refreshToken: (parent: any, args: { refreshToken: string }, context: any) => {
        try {
            const token = jwt.decode(args.refreshToken) as JwtPayload || null;

            if (!token) {
                throw new Error('Invalid token');
            }

            const user: User = {
                id: token.id as number,
                isAdmin: token.isAdmin as boolean,
                username: token.username as string,
                password: '', // You might not have the password in the token payload.
            };

            const accessToken = generateAccessToken(user);

            return {
                auth: true,
                accessToken: accessToken,
            };
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
};

export default userMutations;
