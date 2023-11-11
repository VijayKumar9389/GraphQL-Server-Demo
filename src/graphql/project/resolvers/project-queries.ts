// import { getProjects, getProjectWithStakeholders, getStakeholdersByProjectAndTractNumber } from '../services/project.service';
import { getProjectWithStakeholders, getStakeholdersByProjectAndTractNumber } from '../services/project.service';
import { Stakeholder } from '@prisma/client';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const getDeliveriesWithStakeholders = async (projectId: number) => {
  try {
    const deliveriesWithStakeholders = await prisma.delivery.findMany({
      where: { projectId },
      include: {
        project: true,
        packages: {
          include: {
            stakeholder: true,
          },
        },
      },
    });

    return deliveriesWithStakeholders;
  } catch (error) {
    // Handle errors appropriately
    console.error("Error retrieving deliveries with stakeholders:", error);
    throw new Error("Failed to retrieve deliveries with stakeholders");
  }
};


const projectQueries = {

  getDeliveriesWithStakeholders: async (parent: any, args: any, context: any) => {
    const { projectId } = args;
    const deliveries = await getDeliveriesWithStakeholders(projectId);
    return deliveries;
  },


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
        tractRecords: true,
        package: true, // Include the associated package
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
