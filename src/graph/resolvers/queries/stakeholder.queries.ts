import {Stakeholder} from "@prisma/client";
import {getStakeholdersByProjectAndTractNumber} from "../../services/project.services";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const stakeholderQueries = {
    getStakeholderById: async (parent: any, args: { projectId: number; stakeholderId: number }): Promise<Stakeholder | null> => {
        const {projectId, stakeholderId} = args;
        const stakeholder = await prisma.stakeholder.findFirst({
            where: {id: stakeholderId},
            include: {
                tractRecords: true,
                package: true, // Include the associated package
            },
        });
        return stakeholder;
    },

    getStakeholdersByProjectAndTractNumber: async (parent: any, args: any, context: any) => {
        const {projectId, tractNumber} = args;
        const stakeholders = await getStakeholdersByProjectAndTractNumber(projectId, tractNumber);
        return stakeholders;
    },
}

export default stakeholderQueries;