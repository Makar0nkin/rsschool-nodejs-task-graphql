import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { iDataLoaders, iMemberType, iPost, iProfile, iUserPrismaResponse } from './interfaces.js';
import { orderDataByField } from './funcUtils.js';

export const createDataLoaders = (prisma: PrismaClient): iDataLoaders => {
  const batchUserById = async (ids: readonly string[]): Promise<iUserPrismaResponse[]> => {
    const users = await prisma.user.findMany({
      where: { id: { in: ids as string[] } },
      include: {
        // profile: true,
        // posts: true,
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

  const batchProfileByUser = async (ids: readonly string[]): Promise<iProfile[]> => {
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: ids as string[] } },
    });
    return orderDataByField(profiles, ids as string[], 'userId');
  }

  const batchPostsByAuthor = async (ids: readonly string[]): Promise<iPost[][]> => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: ids as string[] } },
    });

    const postsMapping = posts.reduce((acc: Record<string, iPost[]>, post) => {
      const authorId = post.authorId;
      if (authorId) {
        acc[authorId] = acc[authorId] ? [...acc[authorId], post] : [post];
      }
      return acc;
    }, {});

    return ids.map((id) => postsMapping[id]);
  };

  return {
    userLoader: new DataLoader(batchUserById),
    profileLoader: new DataLoader(batchProfileById),
    postLoader: new DataLoader(batchPostById),
    memberTypeLoader: new DataLoader(batchMemberTypeById),
    profileByUserLoader: new DataLoader(batchProfileByUser),
    postsByAuthorLoader: new DataLoader(batchPostsByAuthor),
  };
};
