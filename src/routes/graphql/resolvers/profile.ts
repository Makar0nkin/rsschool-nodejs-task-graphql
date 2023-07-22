import { PrismaClient } from '@prisma/client';
import { iID, iProfile } from '../utils/interfaces.js';

export const profileResolvers = {
  profile: async ({ id }: iID, prisma: PrismaClient): Promise<iProfile | null> => {
    if (!id) {
      throw new Error('id is required');
    }
    const profile = await prisma.profile.findUnique({
      where: { id },
    });
    return profile;
  },
  profiles: async (_: any, prisma: PrismaClient): Promise<iProfile[]> => {
    return await prisma.profile.findMany();
  },
};
