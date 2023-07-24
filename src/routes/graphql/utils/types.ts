import { iSchemaField, iUserPrismaResponse } from './interfaces.js';

export type SchemaFieldsType = Record<string, iSchemaField>;

export type iSubscribersOnAuthors = Required<
  Pick<iUserPrismaResponse, 'subscribedToUser' | 'userSubscribedTo'>
>; 

// export enum MemberTypeId {
//   BASIC = 'basic',
//   BUSINESS = 'business',
// }