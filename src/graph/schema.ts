import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

import projectResolvers from './resolvers/project.resolver';
import { projectTypeDefs } from './schema/project.schema';

import deliveryResolver from "./resolvers/delivery.resolver";
import {deliveryTypeDefs} from "./schema/delivery.schema";

import stakeholderResolvers from "./resolvers/stakeholder.resolvers";
import {stakeholderTypeDefs} from "./schema/stakeholder.schema";

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [projectTypeDefs, deliveryTypeDefs, stakeholderTypeDefs],
    resolvers: [projectResolvers, deliveryResolver, stakeholderResolvers],
});

export default schema;
