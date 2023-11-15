import projectQueries from './queries/project.queries';
import projectMutations from './mutations/project.mutations';

const projectResolvers = {
    Query: {
        ...projectQueries,
    },
    Mutation: {
        ...projectMutations,
    },
};

export default projectResolvers;
