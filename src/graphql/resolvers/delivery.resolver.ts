import deliveryMutation from './mutations/delivery.mutations';
import deliveryQueries from './queries/delivery.queries';

const deliveryResolvers = {
    Query: {
        ...deliveryQueries,
    },
    Mutation: {
        ...deliveryMutation,
    },
};

export default deliveryResolvers;