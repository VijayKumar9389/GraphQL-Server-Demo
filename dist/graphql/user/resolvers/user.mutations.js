"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ user }, 'secret', { expiresIn: '5m' });
}
const userMutations = {
    login: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = args.input;
        try {
            const user = yield prisma.user.findUnique({
                where: { username },
            });
            if (!user) {
                throw new Error('User does not exist');
            }
            const passwordMatch = yield bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Incorrect password');
            }
            const token = generateAccessToken(user);
            const refreshToken = jsonwebtoken_1.default.sign({ user }, 'secret', { expiresIn: '12hr' });
            console.log(`${user.username} successfully logged in`);
            return {
                auth: true,
                accessToken: token,
                refreshToken: refreshToken,
                user: user.username,
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    register: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = args.input;
        // Hash the password
        const saltRounds = 10; // You can adjust the salt rounds as needed
        const hashedPassword = yield bcrypt.hash(password, saltRounds);
        // Create a new user in the database
        const user = yield prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        return user;
    }),
    refreshToken: (parent, args, context) => {
        try {
            const token = jsonwebtoken_1.default.decode(args.refreshToken) || null;
            if (!token) {
                throw new Error('Invalid token');
            }
            const user = {
                id: token.id,
                isAdmin: token.isAdmin,
                username: token.username,
                password: '', // You might not have the password in the token payload.
            };
            const accessToken = generateAccessToken(user);
            return {
                auth: true,
                accessToken: accessToken,
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    },
};
exports.default = userMutations;
//# sourceMappingURL=user.mutations.js.map