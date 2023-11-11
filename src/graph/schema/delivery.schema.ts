import {gql} from "apollo-server-express";
import {deliveryTypes} from "../types/delivery.types";

export const deliveryTypeDefs = gql`
    
${deliveryTypes}
    
    type Query {
        getDeliveriesWithStakeholders(projectId: Int!): [Delivery]
    }

    type Mutation {
        createDeliveryAndPackage(deliveryInput: DeliveryInput): Delivery
    }
`;