import { PrismaClient } from "@prisma/client";
import { iID, iUser, iUserPrismaResponse } from "../utils/interfaces.js";



export const userResolvers = {
  user: async (
    { id }: iID,
    prisma: PrismaClient,
  ): Promise<iUserPrismaResponse | null> => {
    if (!id) {
      throw new Error('id is required');
    }

    const findUserById = async (id: string): Promise<iUserPrismaResponse | null> => {
      console.log("FIND USER BY ID CALLED", id);
      let user = await prisma.user.findUnique({
        where: { id },
        include: {
          posts: true,
          profile: true,
          subscribedToUser: true, // subscriberId -> user
          userSubscribedTo: true, // authorId -> user
        },
      });
      const subscribedToUser = await Promise.all(
        user!.subscribedToUser.map(
          async ({ subscriberId }) => await findUserById(subscriberId),
        ),
      );
      // const userSubscribedTo = await Promise.all(
      //   user!.userSubscribedTo.map(
      //     async ({ authorId }) => await findUserById(authorId)
      //   ),
      // );
      console.log('\nSUBS TO USER', subscribedToUser, '\nUSER SUBS TO');
      return user!
    };

    const user = await findUserById(id);

    console.log('USER\n', user);

    return user;
  },
  users: async (_: any, prisma: PrismaClient): Promise<iUserPrismaResponse[]> => {
    return await prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
        subscribedToUser: true, // subscriberId -> user
        userSubscribedTo: true, // authorId -> user
      },
    });
  },
};