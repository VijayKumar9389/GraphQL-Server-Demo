import { gql } from "apollo-server-express";
import { projectTypes } from "./types/project.types";
import { projectInputTypes } from "./types/project.input";
import { projectOutputTypes } from "./types/project.output";

export const projectTypeDefs = gql`

${projectTypes}
${projectInputTypes}
${projectOutputTypes}

type Query {
    projects: [Project]
    getStakeholderById(projectId: Int!, stakeholderId: Int!): Stakeholder
    getProjectWithStakeholders(projectId: Int!): Project
    getStakeholdersByProjectAndTractNumber(projectId: Int!, tractNumber: String!): [Stakeholder]
}

type Mutation {
 createDeliveryAndPackage(deliveryInput: DeliveryInput): Delivery
    createProject(project: ProjectInput!): String
    updateStakeholder(id: Int!, input: StakeholderUpdateInput!): Stakeholder
}
`;

