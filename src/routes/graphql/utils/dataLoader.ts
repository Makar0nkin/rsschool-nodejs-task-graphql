import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { iDataLoaders, iMemberType, iPost, iProfile, iUserPrismaResponse } from './interfaces.js';
import { orderDataByField } from './funcUtils.js';

export const createDataLoaders = (prisma: PrismaClient): iDataLoaders => {
  const batchUserById = async (ids: readonly string[]): Promise<iUserPrismaResponse[]> => {
    const users = await prisma.user.findMany({
      where: { id: { in: ids as string[] } },
      include: {
        profile: true,
        posts: true,
        userSubscribedTo: true,
        subscribedToUser: true,
      },
    });
    return orderDataByField(users, ids as string[], 'id');
  };

  const batchProfileById = async (ids: readonly string[]): Promise<iProfile[]> => {
    const profiles = await prisma.profile.findMany({
      where: { id: { in: ids as string[] } },
    });
    return orderDataByField(profiles, ids as string[], 'id')
  };

  const batchPostById = async (ids: readonly string[]): Promise<iPost[]> => {
    const posts = await prisma.post.findMany({
      where: { id: { in: ids as string[] } },
    });
    return orderDataByField(posts, ids as string[], 'id');
  };

  const batchMemberTypeById = async (ids: readonly string[]): Promise<iMemberType[]> => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: ids as string[] } },
      include: {
        profiles: true,
      },
    });
    return orderDataByField(memberTypes, ids as string[], 'id');
  };

  return {
    userLoader: new DataLoader(batchUserById),
    profileLoader: new DataLoader(batchProfileById),
    postLoader: new DataLoader(batchPostById),
    memberTypeLoader: new DataLoader(batchMemberTypeById),
  };
};
