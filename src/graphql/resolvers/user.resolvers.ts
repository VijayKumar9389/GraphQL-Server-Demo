import userQueries from "./queries/user.queries";
import userMutations from "./mutations/user.mutations";

const userResolvers = {
    Query: {
        ...userQueries,
    },
    Mutation: {
        ...userMutations,
    },
};

export default userResolvers;
