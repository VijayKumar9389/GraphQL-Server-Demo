"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectOutputTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.projectOutputTypes = (0, apollo_server_express_1.gql) `
  type CreatedProject {
    id: Int
    name: String
    notes: String
    surveyLink: String
    stakeholders: [Stakeholder]
  }
`;
//# sourceMappingURL=project.output.js.map