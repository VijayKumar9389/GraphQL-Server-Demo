import {gql} from "apollo-server-express";

export const itemTypeDefs = gql`

input CreateItemInput {
  name: String!
  description: String!
  image: String!
  projectId: Int!
  file: Upload # Add a new input field for file upload
}

type Item {
  id: Int!
  name: String!
  description: String!
  image: String!
}

type Mutation {
  createItem(input: CreateItemInput!): Item
}
`;