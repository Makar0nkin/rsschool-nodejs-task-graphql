import { GraphQLNonNull, GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql';
import { UUIDType } from "./uuid.js";
import { memberTypeType } from './memberType.js';
import { iContextLoader } from '../utils/interfaces.js';
import { userType } from './user.js';


export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    // userId: { type: new GraphQLNonNull(UUIDType) },
    user: { 
      type: new GraphQLNonNull(userType) ,
      resolve: async ({ userId }, args, { userLoader }: iContextLoader) => { 
        return userLoader.load(userId as string);
      }
    },
    // memberTypeId: { type: new GraphQLNonNull(GraphQLString) }
    memberType: {
      type: new GraphQLNonNull(memberTypeType),
      resolve: async ({ memberTypeId }, args, { memberTypeLoader }: iContextLoader) => {
        return memberTypeLoader.load(memberTypeId as string);
      },
    },
  }),
});