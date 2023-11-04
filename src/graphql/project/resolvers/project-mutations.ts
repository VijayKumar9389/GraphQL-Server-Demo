// project/resolvers/projectMutations.ts
import {ProjectRecordInput, ProjectInput, StakeholderInput, TractRecordInput} from "../dtos/project.dtos";
import {convertProjectRecordsToStakeholders} from "../services/project.service";
// import { createStakeholder, createTractRecords } from '../services/project.service';

import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

const projectMutations = {

    createProject: async (parent: any, args: { project: ProjectInput }, context: any): Promise<string> => {
        const { project } = args;

        if (project) {
            try {
                console.log('Received Project Record:');
                console.log(project.name);
                console.log(project.notes);
                console.log(project.surveyLink);

                // Create the project and retrieve its ID (automatically generated)
                const createdProject = await prisma.project.create({
                    data: {
                        name: project.name,
                        notes: project.notes,
                        surveyLink: project.surveyLink,
                    },
                });

                const projectRecords: ProjectRecordInput[] = project.projectRecords;

                // Convert the project records to stakeholders using the conversion function
                const stakeholders: StakeholderInput[] = convertProjectRecordsToStakeholders(projectRecords);

                for (const stakeholder of stakeholders) {
                    // Create the stakeholder for the project
                    const createdStakeholder = await prisma.stakeholder.create({
                        data: {
                            name: stakeholder.name,
                            streetAddress: stakeholder.streetAddress,
                            mailingAddress: stakeholder.mailingAddress,
                            phoneNumber: stakeholder.phoneNumber,
                            interest: stakeholder.interest,
                            isPerson: stakeholder.isPerson,
                            stakeholderComments: stakeholder.stakeholderComments, // Add stakeholder-specific fields
                            stakeholderStatus: stakeholder.stakeholderStatus,
                            contacted: stakeholder.contacted,
                            consultation: stakeholder.consultation,
                            attempts: stakeholder.attempts,
                            email: stakeholder.email,
                            followUp: stakeholder.followUp,
                            projectId: createdProject.id, // Assign the project ID
                        },
                    });

                    // Create the tract records for the stakeholder
                    const tractRecords = stakeholder.tractRecords.map((tractRecord) => {
                        return {
                            tract: tractRecord.tract,
                            pin: tractRecord.pin,
                            structure: tractRecord.structure, // Add tract record fields
                            occupants: tractRecord.occupants,
                            worksLand: tractRecord.worksLand,
                            tractComments: tractRecord.tractComments,
                            pipelineStatus: tractRecord.pipelineStatus,
                            commodity: tractRecord.commodity,
                            pageNumber: tractRecord.pageNumber,
                            keepdelete: tractRecord.keepdelete,
                            stakeholderId: createdStakeholder.id, // Assign the stakeholder ID
                        };
                    });

                    await prisma.tractRecord.createMany({
                        data: tractRecords,
                    });
                }


                return 'Project Record created successfully';
            } catch (error) {
                console.error('Error creating Project Record:', error);
                throw new Error('Internal Server Error');
            }
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
