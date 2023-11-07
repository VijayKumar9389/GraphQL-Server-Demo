import {ProjectRecordInput, StakeholderInput, TractRecordInput} from "../dtos/project.dtos";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

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

export const getStakeholdersByProjectAndTractNumber = async (projectId: number, tractNumber: string) => {
  try {
    const stakeholders = await prisma.stakeholder.findMany({
      where: {
        projectId: projectId,
        tractRecords: { some: { tract: tractNumber } },
      },
      include: { tractRecords: true },
    });
    return stakeholders;
  } catch (error) {
    throw error;
  }
};

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