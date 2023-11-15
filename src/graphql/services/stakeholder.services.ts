import { PrismaClient, Stakeholder } from '@prisma/client'; // Import your Prisma types
import {StakeholderUpdateInput} from '../models/stakeholder.models';

const prisma = new PrismaClient(); // Instantiate PrismaClient

export const updateStakeholderService = async (id: number, input: StakeholderUpdateInput): Promise<Stakeholder> => {
    // Use Prisma to update the stakeholder with the provided ID
    const updatedStakeholder = await prisma.stakeholder.update({
        where: { id },
        data: input,
    });
    return updatedStakeholder;
};
