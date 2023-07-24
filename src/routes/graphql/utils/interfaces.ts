import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";
import { GraphQLType } from "graphql";

export interface iID {
  id: string
}

export interface iUser extends iID {
  name: string
  balance: number
  // posts: iPost[]
  // profile?: iProfile;
  subscribedToUser?: iUser // subscriberId -> user
  userSubscribedTo?: iUser// authorId -> user
}

export interface iSubscriberOnAuthors {
  subscriberId: string;
  authorId: string;
}

export interface iUserPrismaResponse extends Omit<iUser, 'subscribedToUser' | 'userSubscribedTo'> {
  subscribedToUser?: iSubscriberOnAuthors[]; // subscriberId -> user
  userSubscribedTo?: iSubscriberOnAuthors[]; // authorId -> user
}

export interface iPost extends iID {
  title: string;
  content: string;
  authorId: string;
}

export interface iProfile extends iID {
  isMale: boolean,
  yearOfBirth: number,
  userId: string,
  memberTypeId: string
}

export interface iMemberType extends iID {
  discount: number;
  postsLimitPerMonth: number;
  profiles: iProfile[];
}

export interface iSchemaField {
  type: GraphQLType
  args?: Record<string, Record<string, GraphQLType>>
}

export interface iDataLoaders {
  userLoader: DataLoader<string, iUserPrismaResponse>;
  profileLoader: DataLoader<string, iProfile>;
  postLoader: DataLoader<string, iPost>;
  memberTypeLoader: DataLoader<string, iMemberType>;
  profileByUserLoader: DataLoader<string, iProfile>
  postsByAuthorLoader: DataLoader<string, iPost[]>
}

export interface iContextLoader extends iDataLoaders {
  prisma: PrismaClient
} 