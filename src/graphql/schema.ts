import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

import projectResolvers from './resolvers/project.resolver';
import { projectTypeDefs } from './schema/project.schema';

import deliveryResolver from "./resolvers/delivery.resolver";
import {deliveryTypeDefs} from "./schema/delivery.schema";

import stakeholderResolvers from "./resolvers/stakeholder.resolvers";
import {stakeholderTypeDefs} from "./schema/stakeholder.schema";

import userResolvers from "./resolvers/user.resolvers";
import {userTypeDefs} from "./schema/user.schema";

const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs: [projectTypeDefs, deliveryTypeDefs, stakeholderTypeDefs, userTypeDefs],
    resolvers: [projectResolvers, deliveryResolver, stakeholderResolvers, userResolvers],
});

export default schema;
