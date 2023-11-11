import {gql} from "apollo-server-express";
import {stakeholderTypes} from "../types/stakeholder.types";

export const stakeholderTypeDefs = gql`
    
    ${stakeholderTypes}
    
    type Query {
    getStakeholderById(projectId: Int!, stakeholderId: Int!): Stakeholder
    getProjectWithStakeholders(projectId: Int!): Project
    getStakeholdersByProjectAndTractNumber(projectId: Int!, tractNumber: String!): [Stakeholder]
}

type Mutation {
    updateStakeholder(id: Int!, input: StakeholderUpdateInput!): Stakeholder
}
`;

export default stakeholderTypeDefs;