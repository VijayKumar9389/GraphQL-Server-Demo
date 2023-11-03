import userQueries from "./user.queries";
import userMutations from "./user.mutations";

const userResolvers = {
    Query: {
        ...userQueries,
    },
    Mutation: {
        ...userMutations,
    },
};

export default userResolvers;
