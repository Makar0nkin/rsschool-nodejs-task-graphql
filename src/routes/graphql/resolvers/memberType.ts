import { PrismaClient } from '@prisma/client';
import { iContextLoader, iID, iMemberType, iPost } from '../utils/interfaces.js';

export const memberTypeResolvers = {
  memberType: async ({ id }: iID, { memberTypeLoader }: iContextLoader): Promise<iMemberType | null> => {
    if (!id) {
      throw new Error('id is required');
    }
    return memberTypeLoader.load(id)
  },
  memberTypes: async (_: any, { prisma }: iContextLoader): Promise<iMemberType[]> => {
    return await prisma.memberType.findMany();
  },
};
