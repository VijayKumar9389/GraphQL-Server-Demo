export interface ProjectRecordInput {
    position: number;
    tract: string;
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
    occupants: string;
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
    interest: string;
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
    tract: string; // Replace String! with string
    pin: string; // You can keep the question mark for optional fields
    structure: string;
    occupants: string;
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