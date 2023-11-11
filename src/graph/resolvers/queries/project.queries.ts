import {getProjectWithStakeholders, getStakeholdersByProjectAndTractNumber} from '../../services/project.services';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const stakeholderQueries = {
    getProjectWithStakeholders: async (parent: any, args: any, context: any) => {
        const {projectId} = args;
        const project = await getProjectWithStakeholders(projectId);
        return project;
    },
};

export default stakeholderQueries;