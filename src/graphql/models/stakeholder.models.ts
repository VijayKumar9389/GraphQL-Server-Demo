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


