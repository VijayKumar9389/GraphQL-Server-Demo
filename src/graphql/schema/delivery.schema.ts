import {gql} from "apollo-server-express";
import DocumentNode from "graphql";
import {deliveryTypes} from "../types/delivery.types";

export const deliveryTypeDefs: DocumentNode.DocumentNode = gql`
    
${deliveryTypes}
    
    type Query {
        getDeliveriesWithStakeholders(projectId: Int!): [Delivery]
    }

    type Mutation {
        createDeliveryAndPackage(deliveryInput: DeliveryInput): [Delivery]
    }
    
`;