// import { getProjects, getProjectWithStakeholders, getStakeholdersByProjectAndTractNumber } from '../services/project.service';
import { getProjectWithStakeholders, getStakeholdersByProjectAndTractNumber } from '../services/project.service';
import { Stakeholder } from '@prisma/client';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();
const projectQueries = {

  getProjectWithStakeholders: async (parent: any, args: any, context: any) => {
    const { projectId } = args;
    const project = await getProjectWithStakeholders(projectId);
    return project;
  },

  getStakeholderById: async (parent: any, args: { projectId: number; stakeholderId: number }): Promise<Stakeholder | null> => {
    const { projectId, stakeholderId } = args;
    const stakeholder = await prisma.stakeholder.findFirst({
      where: { id: stakeholderId },
      include: {
        tractRecords: true, // Include tractRecords in the query
      },
    });
    return stakeholder;
  },

  getStakeholdersByProjectAndTractNumber: async (parent: any, args: any, context: any) => {
    const { projectId, tractNumber } = args;
    const stakeholders = await getStakeholdersByProjectAndTractNumber(projectId, tractNumber);
    return stakeholders;
  },

};

export default projectQueries;
