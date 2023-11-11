import {StakeholderUpdateInput} from "../../models/stakeholder.models";
import {Stakeholder, PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const stakeholderMutations = {
    updateStakeholder: async (parent: any, args: { id: number; input: StakeholderUpdateInput }, context: any): Promise<Stakeholder> => {
        // Use Prisma to update the stakeholder with the provided ID
        const updatedStakeholder = await prisma.stakeholder.update({
            where: { id: args.id },
            data: args.input, // Use the input from args
        });
        return updatedStakeholder;
    },
}

export default stakeholderMutations;