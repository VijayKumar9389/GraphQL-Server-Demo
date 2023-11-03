"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userTypes = (0, apollo_server_express_1.gql) `
type User {
    id: Int!
    isAdmin: Boolean!
    username: String!
    password: String!
  }
  
  type AuthResponse {
    auth: Boolean!
    accessToken: String!
    refreshToken: String!
    user: String!
  }
  
`;
//# sourceMappingURL=user.types.js.map