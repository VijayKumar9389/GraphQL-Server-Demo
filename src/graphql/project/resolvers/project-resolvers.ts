// project/resolvers/projectResolvers.ts
import projectQueries from './project-queries';
import projectMutations from './project-mutations';

const projectResolvers = {
    Query: {
        ...projectQueries,
    },
    Mutation: {
        ...projectMutations,
    },
};

export default projectResolvers;
