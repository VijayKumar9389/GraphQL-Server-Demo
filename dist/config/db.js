"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrismaService = void 0;
const client_1 = require("@prisma/client");
const createPrismaService = () => {
    const prisma = new client_1.PrismaClient();
    return { prisma };
};
exports.createPrismaService = createPrismaService;
//# sourceMappingURL=db.js.map