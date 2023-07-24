import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { userType } from './user.js';
import { iContextLoader } from '../utils/interfaces.js';

export const postType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: { 
      type: new GraphQLNonNull(userType),
      resolve: async ({ authorId }, args, { userLoader }: iContextLoader) => {
        return userLoader.load(authorId as string);
      }
    },
  }),
});
