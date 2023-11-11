import {gql} from "apollo-server-express";
import {projectTypes} from "../types/project.types";

export const projectTypeDefs = gql`

${projectTypes}

type Query {
    projects: [Project]
}

type Mutation {
    createProject(project: ProjectInput!): String
}
`;

