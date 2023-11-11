import {gql} from 'apollo-server-express';

export const projectInputTypes = gql`
input ProjectInput {
    name: String
    notes: String
    surveyLink: String
    projectRecords: [ProjectRecordInput]
}

input StakeholderUpdateInput {
  name: String
  streetAddress: String
  mailingAddress: String
  phoneNumber: String
  isPerson: String
  stakeholderComments: String
  stakeholderStatus: String
  contacted: String
  consultation: String
  attempts: String
  email: String
  followUp: String
}

input DeliveryInput {
  date: String!
  status: String!
  projectId: Int!
  packages: [PackageInput]!
}

input PackageInput {
  deliveryId: Int!
  stakeholderId: Int!
}

input StakeholderInput {
    name: String
    streetAddress: String
    mailingAddress: String
    phoneNumber: String
    isPerson: String
    stakeholderComments: String
    stakeholderStatus: String
    contacted: String
    consultation: String
    attempts: String
    email: String
    followUp: String
    tractRecords: [TractRecordInput]
}

input TractRecordInput {
    position: Int
    tract: Int
    interest: String
    pin: String
    structure: String
    occupants: Int
    worksLand: String
    tractComments: String
    pipelineStatus: String
    commodity: String
    pageNumber: String
    keepdelete: String
}

input ProjectRecordInput {
    position: Int
    tract: Int
    pin: String
    structure: String
    interest: String
    isPerson: String
    stakeholderComments: String
    stakeholderStatus: String
    name: String
    streetAddress: String
    mailingAddress: String
    phoneNumber: String
    occupants: Int
    worksLand: String
    contacted: String
    attempts: String
    consultation: String
    followUp: String
    tractComments: String
    pageNo: String
    keepDelete: String
    email: String
    Commodity: String
    pipelineStatus: String
}
`;
