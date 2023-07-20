import { PrismaClient } from "@prisma/client";
import { iID, iUser } from "../utils/interfaces.js";

export const userResolvers = {
  user: async ({ id }: iID, prisma: PrismaClient): Promise<iUser> => {
    if (!id) {
      throw new Error('id is required');
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user!;
  },
  users: async (_: any, prisma: PrismaClient): Promise<iUser[]> => {
    return await prisma.user.findMany();
  },
};