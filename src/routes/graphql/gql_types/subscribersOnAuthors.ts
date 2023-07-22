import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    subscriberId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});