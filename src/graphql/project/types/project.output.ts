import { gql } from 'apollo-server-express';

export const projectOutputTypes = gql`
  type CreatedProject {
    id: Int
    name: String
    notes: String
    surveyLink: String
    stakeholders: [Stakeholder]
  }
`;
