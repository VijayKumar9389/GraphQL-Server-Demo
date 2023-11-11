import {gql} from 'apollo-server-express';

export const projectTypes = gql`
  type Project {
    id: Int
    name: String
    notes: String
    surveyLink: String
    stakeholders: [Stakeholder]
  }

  type ProjectRecord {
    id: Int
    position: Int  # Add the position field
    tract: Int
    pin: String
    structure: String
    interest: String
    stakeholderStatus: String
    name: String
    streetAddress: String
    mailingAddress: String
    phoneNumber: String
    occupants: Int
    worksLand: String
    contacted: String
    attempts: String
    consultation: String
    followUp: String
    tractComments: String
    pageNo: String
    keepDelete: String
    email: String
    Commodity: String
    pipelineStatus: String
    tractRecord: TractRecord
  }


type PackageItem {
  id: Int!
  packageType: PackageType!
  packageTypeId: Int!
  item: Item!
  itemId: Int!
  quantity: Int!
}

type Item {
  id: Int!
  name: String!
  description: String!
  projectId: Int!
  project: Project!
  packageItems: [PackageItem!]!
  logs: [Log!]!
}

type Log {
  id: Int!
  project: Project
  projectId: Int
  timestamp: String!
  details: String!
  stakeholder: Stakeholder
  stakeholderId: Int
  delivery: Delivery
  deliveryId: Int
  package: Package
  packageId: Int
  tractRecord: TractRecord
  tractRecordId: Int
  item: Item
  itemId: Int
}

type Delivery {
  id: Int
  date: String
  status: String
  projectId: Int
  packages: [Package]
}

type Package {
    id: Int
    deliveryId: Int
    stakeholderId: Int
}

  type Project {
    id: Int
    name: String
    notes: String
    surveyLink: String
    stakeholders: [Stakeholder]
  }

type PackageItem {
  id: Int!
  packageType: PackageType!
  packageTypeId: Int!
  item: Item!
  itemId: Int!
  quantity: Int!
}

type Item {
  id: Int!
  name: String!
  description: String!
  projectId: Int!
  project: Project!
  packageItems: [PackageItem!]!
  logs: [Log!]!
}

type Log {
  id: Int!
  project: Project
  projectId: Int
  timestamp: String!
  details: String!
  stakeholder: Stakeholder
  stakeholderId: Int
  delivery: Delivery
  deliveryId: Int
  package: Package
  packageId: Int
  tractRecord: TractRecord
  tractRecordId: Int
  item: Item
  itemId: Int
}

input ProjectInput {
    name: String
    notes: String
    surveyLink: String
    projectRecords: [ProjectRecordInput]
}

input ProjectRecordInput {
    position: Int
    tract: Int
    pin: String
    structure: String
    interest: String
    isPerson: String
    stakeholderComments: String
    stakeholderStatus: String
    name: String
    streetAddress: String
    mailingAddress: String
    phoneNumber: String
    occupants: Int
    worksLand: String
    contacted: String
    attempts: String
    consultation: String
    followUp: String
    tractComments: String
    pageNo: String
    keepDelete: String
    email: String
    Commodity: String
    pipelineStatus: String
}
`;
