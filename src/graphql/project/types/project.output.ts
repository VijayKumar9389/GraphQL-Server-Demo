import { gql } from 'apollo-server-express';
import {DocumentNode} from "graphql/language";

export const projectOutputTypes : DocumentNode = gql`
  type CreatedProject {
    id: Int
    name: String
    notes: String
    surveyLink: String
    stakeholders: [Stakeholder]
  }
`;
