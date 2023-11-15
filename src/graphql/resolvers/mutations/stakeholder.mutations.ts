import {StakeholderUpdateInput} from "../../models/stakeholder.models";
import {Stakeholder, PrismaClient} from '@prisma/client';
import {updateStakeholderService} from "../../services/stakeholder.services"

const prisma = new PrismaClient();

const stakeholderMutations = {
    updateStakeholder: async (parent: any, args: { id: number; input: StakeholderUpdateInput }, context: any): Promise<Stakeholder> => {
        const { id, input } = args;
        // Call the service function to update the stakeholder
        const updatedStakeholder = await updateStakeholderService(id, input);

        return updatedStakeholder;
    },
}

export default stakeholderMutations;