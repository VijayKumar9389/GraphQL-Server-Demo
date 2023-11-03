import { gql } from "apollo-server-express";

export const userInputTypes = gql`
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