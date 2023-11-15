import { gql } from "apollo-server-express";
import {userTypes} from "../types/user.types";

export const userTypeDefs = gql`

${userTypes}

type Query {
    getUsers: [User!]!
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse!
    register(input: RegisterInput!): User!
    refreshToken(input: RefreshTokenInput!): AuthResponse!
  }
`;