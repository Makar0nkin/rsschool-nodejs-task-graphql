import { PrismaClient } from '@prisma/client';
import { iID, iPost } from '../utils/interfaces.js';

export const postResolvers = {
  post: async ({ id }: iID, prisma: PrismaClient): Promise<iPost | null> => {
    if (!id) {
      throw new Error('id is required');
    }
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return post;
  },
  posts: async (_: any, prisma: PrismaClient): Promise<iPost[]> => {
    return await prisma.post.findMany();
  },
};
