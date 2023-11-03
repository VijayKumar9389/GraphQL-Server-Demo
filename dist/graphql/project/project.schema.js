"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const projest_types_1 = require("./types/projest.types");
const project_input_1 = require("./types/project.input");
const project_output_1 = require("./types/project.output");
exports.projectTypeDefs = (0, apollo_server_express_1.gql) `

${projest_types_1.projectTypes}
${project_input_1.projectInputTypes}
${project_output_1.projectOutputTypes}

type Query {
    projects: [Project]
    getProjectWithStakeholders(projectId: Int!): Project
    getStakeholdersByProjectAndTractNumber(projectId: Int!, tractNumber: String!): [Stakeholder]
}

type Mutation {
    createProject(project: ProjectInput!): Project
  }
`;
//# sourceMappingURL=project.schema.js.map