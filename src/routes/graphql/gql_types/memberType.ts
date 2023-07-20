import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const memberTypeType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    discount: { type:  new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type:  new GraphQLNonNull(GraphQLInt) },
  },
});