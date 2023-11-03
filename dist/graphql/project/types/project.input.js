"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectInputTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.projectInputTypes = (0, apollo_server_express_1.gql) `

input ProjectInput {
    name: String
    notes: String
    surveyLink: String
    stakeholders: [StakeholderInput]
  }
  
input StakeholderInput {
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
    tractRecords: [TractRecordInput]  # Add tractRecords input field here
  }

  input TractRecordInput {
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
  }

  input TractRecordUpdateInput {
    id: Int!
    tract: String!
    pin: String
    structure: String
    occupants: String
    worksLand: String
    tractComments: String
    pipelineStatus: String
    commodity: String
    pageNumber: String
    keepdelete: String
  }

`;
//# sourceMappingURL=project.input.js.map