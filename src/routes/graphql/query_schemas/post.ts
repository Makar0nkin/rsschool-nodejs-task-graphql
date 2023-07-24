import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { UUIDType } from '../gql_types/uuid.js';
import { postType } from '../gql_types/post.js';

export const postSchemaFields = {
  post: {
    type: postType,
    args: {
      id: { type: UUIDType },
    },
  },
  posts: {
    type: new GraphQLList(postType),
  },
};