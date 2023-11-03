import { gql } from "apollo-server-express";

export const userOutputTypes = gql`

type AuthResponse {
    auth: Boolean!
    accessToken: String!
    refreshToken: String!
    user: String!
  }

  `;
