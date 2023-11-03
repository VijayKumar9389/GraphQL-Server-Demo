"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOutputTypes = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.userOutputTypes = (0, apollo_server_express_1.gql) `

type AuthResponse {
    auth: Boolean!
    accessToken: String!
    refreshToken: String!
    user: String!
  }

  `;
//# sourceMappingURL=user.output.js.map