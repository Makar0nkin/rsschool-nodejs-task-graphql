import {
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { postType } from './post.js';
import { profileType } from './profile.js';
import { iContextLoader, iID, iSubscriberOnAuthors, iUser, iUserPrismaResponse } from '../utils/interfaces.js';

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { type: profileType },
    posts: { type: new GraphQLList(postType) },
    userSubscribedTo: {
      type: new GraphQLList(new GraphQLNonNull(userType)),
      resolve: async ({ userSubscribedTo }, args, { userLoader }: iContextLoader) => {
        if (userSubscribedTo) {
          const authorIds = (userSubscribedTo as iSubscriberOnAuthors[]).map(
            ({ authorId }) => authorId,
          );
          return userLoader.loadMany(authorIds);
        } else {
          return null;
        }
      },
    },
    subscribedToUser: {
      type: new GraphQLList(new GraphQLNonNull(userType)),
      resolve: async ({ subscribedToUser }, args, { userLoader }: iContextLoader) => {
        if (subscribedToUser) {
          const subscriberIds = (subscribedToUser as iSubscriberOnAuthors[]).map(
            ({ subscriberId }) => subscriberId,
          );
          return userLoader.loadMany(subscriberIds);
        } else {
          return null;
        }
      },
    },
  }),
});
