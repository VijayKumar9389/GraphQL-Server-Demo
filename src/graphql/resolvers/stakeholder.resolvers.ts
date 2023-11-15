import stakeholderMutations  from "./mutations/stakeholder.mutations";
import stakeholderQueries from "./queries/stakeholder.queries";

const stakeholderResolvers = {
    Query: {
        ...stakeholderQueries,
    },
    Mutation: {
        ...stakeholderMutations,
    },
};

export default stakeholderResolvers;