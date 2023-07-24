import { PrismaClient } from '@prisma/client';
import { iContextLoader, iID, iPost } from '../utils/interfaces.js';

export const postResolvers = {
  post: async ({ id }: iID, { postLoader } : iContextLoader): Promise<iPost | null> => {
    if (!id) {
      throw new Error('id is required');
    }
    return postLoader.load(id)
  },
  posts: async (_: unknown, { prisma }: iContextLoader): Promise<iPost[]> => {
    return await prisma.post.findMany();
  },
};
