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

export const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { type: profileType },
    posts: { type: new GraphQLList(postType) },
    userSubscribedTo: {
      type: new GraphQLList(new GraphQLNonNull(UUIDType)),
      // resolve: async ({ userSubscribedTo }, args, prisma: PrismaClient) => {
      //   console.log('RESOLVER UST', userSubscribedTo, args);
      //   if (userSubscribedTo) {
      //     const authorIds = userSubscribedTo.map(({ authorId }) => authorId);
      //     const users = await prisma.user.findMany({
      //       where: { id: { in: authorIds as string[] } },
      //       include: {
      //         posts: true,
      //         profile: true,
      //         userSubscribedTo: true,
      //         subscribedToUser: true,
      //       },
      //     });
      //     return users;
      //   }
      // },
    },
    subscribedToUser: {
      type: new GraphQLList(new GraphQLNonNull(UUIDType)),
    },
  }),
});
