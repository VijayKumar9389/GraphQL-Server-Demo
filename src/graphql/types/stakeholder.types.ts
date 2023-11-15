import {gql} from "apollo-server-express";

export const stakeholderTypes = gql`
type Stakeholder {
    id: Int
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
    project: Project
    packageId: Int
    package: Package
    tractRecords: [TractRecord]
}

type TractRecord {
    id: Int
    tract: Int
    position: Int
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
    stakeholder: Stakeholder
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
`;