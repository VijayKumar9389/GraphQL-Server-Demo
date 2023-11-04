// // Import necessary modules and types
// import { PrismaClient } from '@prisma/client';
// import { StakeholderInput } from '../dtos/project.dtos';
//
// // Create an instance of PrismaClient
// const prisma = new PrismaClient();
//
// // Function to create a stakeholder
// export const createStakeholder = async (project: any, stakeholderArgs: StakeholderInput) => {
//   try {
//     // Extract tractRecords from stakeholderArgs
//     const { tractRecords, ...stakeholderData } = stakeholderArgs;
//
//     // Step 1: Create the stakeholder
//     const newStakeholder = await prisma.stakeholder.create({
//       data: {
//         ...stakeholderData,
//         projectId: project.id, // Connect this Stakeholder to a Project
//       },
//     });
//
//     // Step 2: If tractRecords are provided, create and associate them
//     if (tractRecords && tractRecords.length > 0) {
//       const createdTractRecords = await createTractRecords(newStakeholder.id, tractRecords);
//
//       // Connect the created TractRecords to the Stakeholder
//       await prisma.stakeholder.update({
//         where: { id: newStakeholder.id },
//         data: {
//           tractRecords: {
//             connect: createdTractRecords.map((tractRecord) => ({ id: tractRecord.id })),
//           },
//         },
//       });
//     }
//
//     // Return the created stakeholder
//     return newStakeholder;
//   } catch (error) {
//     // Handle errors and throw an internal server error
//     console.error('Error creating stakeholder:', error);
//     throw new Error('Internal Server Error');
//   }
// };
//
// // Function to create TractRecords and return them
// export const createTractRecords = async (stakeholderId: number, tractRecords: any[]) => {
//   const createdTractRecords = await Promise.all(
//     tractRecords.map(async (tractRecordArgs: any) => {
//       const newTractRecord = await prisma.tractRecord.create({
//         data: {
//           ...tractRecordArgs,
//           stakeholderId,
//         },
//       });
//       return newTractRecord;
//     })
//   );
//
//   return createdTractRecords;
// };
//
// export const getProjects = async () => {
//   try {
//     const allProjects = await prisma.project.findMany();
//     return allProjects;
//   } catch (error) {
//     throw error;
//   }
// };
//
export const getProjectWithStakeholders = async (projectId: number) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { stakeholders: { include: { tractRecords: true } } },
    });
    if (!project) {
      throw new Error(`Project with id ${projectId} not found.`);
    }
    return project;
  } catch (error) {
    throw error;
  }
};
//
// export const getStakeholdersByProjectAndTractNumber = async (projectId: number, tractNumber: string) => {
//   try {
//     const stakeholders = await prisma.stakeholder.findMany({
//       where: {
//         projectId: projectId,
//         tractRecords: { some: { tract: tractNumber } },
//       },
//       include: { tractRecords: true },
//     });
//     return stakeholders;
//   } catch (error) {
//     throw error;
//   }
// };

import {ProjectRecordInput, StakeholderInput, TractRecordInput} from "../dtos/project.dtos";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const convertProjectRecordsToStakeholders = (projectRecords: ProjectRecordInput[]): StakeholderInput[] => {

    const stakeholdersMap: Map<string, StakeholderInput> = new Map();

    for (const projectRecord of projectRecords) {

        const {
            name,
            streetAddress,
            mailingAddress,
            phoneNumber,
            interest,
            stakeholderStatus,
            contacted,
            consultation,
            attempts,
            email,
            followUp,
            tractComments,
            tract,
            pin,
            structure,
            occupants,
            worksLand,
            Commodity,
            pipelineStatus,
            pageNo,
            keepDelete,
        } = projectRecord;

        // Create a tract record based on the current project record
        const tractRecordInput: TractRecordInput = {
            tract: projectRecord.tract,
            pin: projectRecord.pin,
            structure: projectRecord.structure,
            occupants: projectRecord.occupants,
            worksLand: projectRecord.worksLand,
            tractComments: projectRecord.tractComments,
            pipelineStatus: projectRecord.pipelineStatus,
            commodity: projectRecord.Commodity,
            pageNumber: projectRecord.pageNo,
            keepdelete: projectRecord.keepDelete,
        };

        if (stakeholdersMap.has(name)) {
            // If the stakeholder already exists, push the tract record to their tractRecords
            const existingStakeholder: StakeholderInput | undefined = stakeholdersMap.get(name);

            if (existingStakeholder) {
                existingStakeholder.tractRecords.push(tractRecordInput);
            }

        } else {
            // If the stakeholder doesn't exist in the map, create a new stakeholder
            const newStakeholder: StakeholderInput = {
                name,
                streetAddress,
                mailingAddress,
                phoneNumber,
                interest,
                isPerson: 'true', // You can set a default value here
                stakeholderComments: tractComments,
                stakeholderStatus,
                contacted,
                consultation,
                attempts,
                email,
                followUp,
                tractRecords: [tractRecordInput],
            };

            stakeholdersMap.set(name, newStakeholder);
        }
    }

    // Convert the map of stakeholders back to an array
    const stakeholders: StakeholderInput[] = Array.from(stakeholdersMap.values());

    return stakeholders;
};
