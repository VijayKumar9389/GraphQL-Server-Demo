import { gql } from "apollo-server-express";
import { userTypes } from "./types/user.types";
import { userInputTypes } from "./types/user.input";
import { userOutputTypes } from "./types/user.output";

export const userTypeDefs = gql`

${userTypes}
${userInputTypes}
${userOutputTypes}

type Query {
    getUsers: [User!]!
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse!
    register(input: RegisterInput!): User!
    refreshToken(input: RefreshTokenInput!): AuthResponse!
  }

`;