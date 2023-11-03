"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userInputTypes = (0, apollo_server_express_1.gql) `
input LoginInput {
    username: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    password: String!
  }

  input RefreshTokenInput {
    refreshToken: String!
  }
`;
//# sourceMappingURL=user.input.js.map