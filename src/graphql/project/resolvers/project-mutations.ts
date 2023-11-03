// project/resolvers/projectMutations.ts
import {ProjectRecordInput, ProjectInput, StakeholderInput} from "../dtos/project.dtos";
// import { createStakeholder, createTractRecords } from '../services/project.service';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

function convertProjectRecordsToStakeholders(projectRecords: ProjectRecordInput[]): StakeholderInput[] {
    return projectRecords.map((projectRecord) => ({
        name: projectRecord.name,
        streetAddress: projectRecord.streetAddress,
        mailingAddress: projectRecord.mailingAddress,
        phoneNumber: projectRecord.phoneNumber,
        interest: projectRecord.interest,
        isPerson: 'true', // You can set a default value here
        stakeholderComments: projectRecord.tractComments,
        stakeholderStatus: projectRecord.stakeholderStatus,
        contacted: projectRecord.contacted,
        consultation: projectRecord.consultation,
        attempts: projectRecord.attempts,
        email: projectRecord.email,
        followUp: projectRecord.followUp,
        tractRecords: [], // You can populate this with relevant data
    }));
}


const projectMutations = {



    createProject: async (parent: any, args: { project: ProjectInput }, context: any): Promise<string> => {
        const {project} = args;
        if (project) {
            console.log('Received Project Record:');
            // Convert the project records to stakeholders
            const stakeholders : StakeholderInput[] = convertProjectRecordsToStakeholders(project.project);
            // Log the converted stakeholders
            console.log('Converted Stakeholders:', stakeholders);

            return 'Project Record created successfully';
        } else {
            return 'No Project Record received';
        }
    }

    // createProject: async (parent: any, args: { project: ProjectInput }, context: any) => {
    //     try {
    //         const { project  } = args;
    //         const { prisma } = context;
    //
    //         // Check if the required fields are provided
    //         if (!project || !project.name) {
    //             throw new Error('Project name is required.');
    //         }
    //
    //         // Step 1: Create the project first
    //         const createdProject = await prisma.project.create({
    //             data: {
    //                 name: project.name,
    //                 notes: project.notes,
    //                 surveyLink: project.surveyLink,
    //             },
    //         });
    //
    //         // Step 2: Create an array to store nested stakeholders with TractRecords
    //         const createdStakeholders  = await Promise.all(
    //             project.stakeholders.map(async (stakeholderArgs) => {
    //                 const newStakeholder = await createStakeholder(createdProject, stakeholderArgs);
    //
    //                 // If there are TractRecords, create them and associate with the Stakeholder
    //                 if (stakeholderArgs.tractRecords && stakeholderArgs.tractRecords.length > 0) {
    //                     const createdTractRecords = await createTractRecords(newStakeholder.id, stakeholderArgs.tractRecords);
    //
    //                     // Add the created TractRecords to the Stakeholder
    //                     await prisma.stakeholder.update({
    //                         where: { id: newStakeholder.id },
    //                         data: {
    //                             tractRecords: {
    //                                 connect: createdTractRecords.map((tractRecord) => ({ id: tractRecord.id })),
    //                             },
    //                         },
    //                     });
    //                 }
    //
    //                 return newStakeholder;
    //             })
    //         );
    //
    //         // Return the created project with associated stakeholders
    //         return {
    //             ...createdProject,
    //             stakeholders: createdStakeholders,
    //         };
    //     } catch (error) {
    //         // Handle errors and throw an internal server error
    //         console.error('Error creating project:', error);
    //         throw new Error('Internal Server Error');
    //     }
    // },
};

export default projectMutations;
