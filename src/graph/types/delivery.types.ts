import {gql} from "apollo-server-express";

export const deliveryTypes = gql`
  type Delivery {
  id: Int!
  date: String!
  status: String!
  projectId: Int!
  project: Project!
  packages: [Package!]!
  logs: [Log!]!
}

type Package {
  id: Int!
  packageType: PackageType
  packageTypeId: Int
  delivery: Delivery!
  deliveryId: Int
  stakeholder: Stakeholder
  stakeholderId: Int
  logs: [Log!]!
}

type PackageType {
  id: Int!
  name: String!
  packages: [Package!]!
  items: [PackageItem!]!
}

input DeliveryInput {
  date: String!
  status: String!
  projectId: Int!
  packages: [PackageInput]!
}

input PackageInput {
  deliveryId: Int!
  stakeholderId: Int!
}

`;