import { PrismaClient } from '@prisma/client';
import { iContextLoader, iID, iProfile } from '../utils/interfaces.js';

export const profileResolvers = {
  profile: async (
    { id }: iID,
    { profileLoader }: iContextLoader,
  ): Promise<iProfile | null> => {
    if (!id) {
      throw new Error('id is required');
    }
    return profileLoader.load(id);
  },
  profiles: async (_: never, { prisma }: iContextLoader): Promise<iProfile[]> => {
    return await prisma.profile.findMany();
  },
};
