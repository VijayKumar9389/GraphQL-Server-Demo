import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql/language';

export const projectTypes: DocumentNode = gql`
  type Project {
    id: Int
    name: String
    notes: String
    surveyLink: String
    stakeholders: [Stakeholder]
  }

  type ProjectRecord {
    id: Int
    position: Int  # Add the position field
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
    tractRecord: TractRecord
  }

  type Stakeholder {
    id: Int
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
    project: Project
    tractRecords: [TractRecord]
  }

  type TractRecord {
    id: Int
    tract: String
    pin: String
    structure: String
    occupants: String
    worksLand: String
    tractComments: String
    pipelineStatus: String
    commodity: String
    pageNumber: String
    keepdelete: String
    stakeholder: Stakeholder
  }
`;
