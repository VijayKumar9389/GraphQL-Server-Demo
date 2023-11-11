export interface ProjectRecordInput {
    position: number;
    tract: number;
    pin: string;
    structure: string;
    interest: string;
    isPerson: string;
    stakeholderComments: string;
    stakeholderStatus: string;
    name: string;
    streetAddress: string;
    mailingAddress: string;
    phoneNumber: string;
    occupants: number;
    worksLand: string;
    contacted: string;
    attempts: string;
    consultation: string;
    followUp: string;
    tractComments: string;
    pageNo: string;
    keepDelete: string;
    email: string;
    Commodity: string;
    pipelineStatus: string;
}

export interface StakeholderInput {
    name: string;
    streetAddress: string;
    mailingAddress: string;
    phoneNumber: string;
    isPerson: string;
    stakeholderComments: string;
    stakeholderStatus: string;
    contacted: string;
    consultation: string;
    attempts: string;
    email: string;
    followUp: string;
    tractRecords: TractRecordInput[]; // Include TractRecordInput here
}

export interface StakeholderUpdateInput {
    name?: string;
    streetAddress?: string;
    mailingAddress?: string;
    phoneNumber?: string;
    isPerson?: string;
    stakeholderComments?: string;
    stakeholderStatus?: string;
    contacted?: string;
    consultation?: string;
    attempts?: string;
    email?: string;
    followUp?: string;
}


export interface TractRecordInput {
    tract: number; // Replace String! with string
    pin: string; // You can keep the question mark for optional fields
    position: number;
    interest: string;
    structure: string;
    occupants: number;
    worksLand: string;
    tractComments: string;
    pipelineStatus: string;
    commodity: string;
    pageNumber: string;
    keepdelete: string;
}

export interface ProjectInput {
    name: string,
    notes: string,
    surveyLink: string,
    projectRecords: ProjectRecordInput[];
}

export interface DeliveryInput {
    date: string;
    status: string;
    projectId: number;
    packages: PackageInput[];
}

// Input type for the Package object
export interface PackageInput {
    deliveryId: number; // Add deliveryId
    stakeholderId: number;
}

