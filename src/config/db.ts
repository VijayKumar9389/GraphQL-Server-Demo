import { PrismaClient } from '@prisma/client';

export interface PrismaService {
  prisma: PrismaClient;
  // Other context properties if needed
}

export const createPrismaService = (): PrismaService => {
  const prisma = new PrismaClient();

  return { prisma };
};

