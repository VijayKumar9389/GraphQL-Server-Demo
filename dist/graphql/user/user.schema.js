"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const user_types_1 = require("./types/user.types");
const user_input_1 = require("./types/user.input");
const user_output_1 = require("./types/user.output");
exports.userTypeDefs = (0, apollo_server_express_1.gql) `

${user_types_1.userTypes}
${user_input_1.userInputTypes}
${user_output_1.userOutputTypes}

type Query {
    getUsers: [User!]!
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse!
    register(input: RegisterInput!): User!
    refreshToken(input: RefreshTokenInput!): AuthResponse!
  }

`;
//# sourceMappingURL=user.schema.js.map