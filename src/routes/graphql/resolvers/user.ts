import { iID, iUserPrismaResponse } from "../utils/interfaces.js";
import { iContextLoader } from '../utils/interfaces.js';

export const userResolvers = {
  user: async (
    { id }: iID,
    { userLoader }: iContextLoader,
  ): Promise<iUserPrismaResponse | null> => {
    if (!id) {
      throw new Error('id is required');
    }
    return userLoader.load(id);
  },
  users: async (_: never, { prisma }: iContextLoader): Promise<iUserPrismaResponse[]> => {
    return await prisma.user.findMany({
      include: {
        // posts: true,
        // profile: true,
        subscribedToUser: true, // subscriberId -> user
        userSubscribedTo: true, // authorId -> user
      },
    });
  },
};