import { gql } from 'apollo-server-express';

export const projectInputTypes = gql`
input ProjectInput {
  project: [ProjectRecordInput]
}

input ProjectRecordInput {
  tract: String
  pin: String
  structure: String
  interest: String
  stakeholderStatus: String
  name: String
  streetAddress: String
  mailingAddress: String
  phoneNumber: String
  occupants: String
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
  
input StakeholderInput {
    name: String
    streetAddress: String
    mailingAddress: String
    phoneNumber: String
    interest: String
    isPerson: String
    stakeholderComments: String
    stakeholderStatus: String
    contacted: String
    consultation: String
    attempts: String
    email: String
    followUp: String
    tractRecords: [TractRecordInput]  # Add tractRecords input field here
  }

  input TractRecordInput {
    id: Int!
    tract: String!
    pin: String
    structure: String
    occupants: String
    worksLand: String
    tractComments: String
    pipelineStatus: String
    commodity: String
    pageNumber: String
    keepdelete: String
  }
`;
