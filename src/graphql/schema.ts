// schema.ts
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';

import { projectTypeDefs } from './project/project.schema';
import { userTypeDefs } from './user/user.schema';

import projectResolvers from './project/resolvers/project-resolvers';
import userResolvers from './user/resolvers/user.resolvers';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [projectTypeDefs, userTypeDefs],
  resolvers: [projectResolvers, userResolvers],
});

export default schema;
