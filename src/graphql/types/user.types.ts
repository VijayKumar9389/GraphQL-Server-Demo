import { gql } from "apollo-server-express";

export const userTypes = gql`

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