import {ProjectRecordInput, ProjectInput} from "../../models/project.models";
import {StakeholderInput, TractRecordInput} from "../../models/stakeholder.models";
import {convertProjectRecordsToStakeholders} from "../../services/project.services";

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const projectMutations = {

    createProject: async (parent: any, args: { project: ProjectInput }, context: any): Promise<string> => {
        const {project} = args;

        // Check if the project was received
        if (project) {
            try {
                console.log('Received Project Records:');

                // Create the project and retrieve its ID (automatically generated)
                const createdProject = await prisma.project.create({
                    data: {
                        name: project.name,
                        notes: project.notes,
                        surveyLink: project.surveyLink,
                    },
                });

                // Retrieve the project records from the input
                const projectRecords: ProjectRecordInput[] = project.projectRecords;

                // Convert the project records to stakeholders using the conversion function
                const stakeholders: StakeholderInput[] = convertProjectRecordsToStakeholders(projectRecords);

                // Create the stakeholders
                for (const stakeholder of stakeholders) {
                    // Create the stakeholder for the project
                    const createdStakeholder = await prisma.stakeholder.create({
                        data: {
                            name: stakeholder.name,
                            streetAddress: stakeholder.streetAddress,
                            mailingAddress: stakeholder.mailingAddress,
                            phoneNumber: stakeholder.phoneNumber,
                            isPerson: stakeholder.isPerson,
                            stakeholderComments: stakeholder.stakeholderComments, // Add stakeholder-specific fields
                            stakeholderStatus: stakeholder.stakeholderStatus,
                            contacted: stakeholder.contacted,
                            consultation: stakeholder.consultation,
                            attempts: stakeholder.attempts,
                            email: stakeholder.email,
                            followUp: stakeholder.followUp,
                            projectId: createdProject.id,
                        },
                    });

                    // Create the tract records for the stakeholder
                    const tractRecords = stakeholder.tractRecords.map((tractRecord: TractRecordInput) => {
                        return {
                            tract: tractRecord.tract,
                            position: tractRecord.position,
                            pin: tractRecord.pin,
                            interest: tractRecord.interest,
                            structure: tractRecord.structure,
                            occupants: tractRecord.occupants,
                            worksLand: tractRecord.worksLand,
                            tractComments: tractRecord.tractComments,
                            pipelineStatus: tractRecord.pipelineStatus,
                            commodity: tractRecord.commodity,
                            pageNumber: tractRecord.pageNumber,
                            keepdelete: tractRecord.keepdelete,
                            stakeholderId: createdStakeholder.id,
                        };
                    });

                    // Create the tract records
                    await prisma.tractRecord.createMany({
                        data: tractRecords,
                    });
                }
                // Return a success message
                return 'Project Record created successfully';
            } catch (error) {
                // Return an error message
                console.error('Error creating Project Record:', error);
                throw new Error('Internal Server Error');
            }
        } else {
            // Return an error message
            return 'No Project Record received';
        }
    },
};

export default projectMutations;