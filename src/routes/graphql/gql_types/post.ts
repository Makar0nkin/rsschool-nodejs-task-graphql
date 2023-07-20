import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql';

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: GraphQLString },
  },
});
