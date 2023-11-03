"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.projectTypes = (0, apollo_server_express_1.gql) `
type Project {
    id: Int
    name: String
    notes: String
    surveyLink: String
    stakeholders: [Stakeholder]
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
//# sourceMappingURL=projest.types.js.map