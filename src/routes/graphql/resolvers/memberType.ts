import { PrismaClient } from '@prisma/client';
import { iID, iMemberType, iPost } from '../utils/interfaces.js';

export const memberTypeResolvers = {
  memberType: async ({ id }: iID, prisma: PrismaClient): Promise<iMemberType | null> => {
    if (!id) {
      throw new Error('id is required');
    }
    const memberType = await prisma.memberType.findUnique({
      where: { id },
    });
    return memberType;
  },
  memberTypes: async (_: any, prisma: PrismaClient): Promise<iMemberType[]> => {
    return await prisma.memberType.findMany();
  },
};
