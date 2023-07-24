import { GraphQLList } from "graphql";
import { profileType } from "../gql_types/profile.js";
import { UUIDType } from "../gql_types/uuid.js";


export const profileSchemaFields = {
  profile: {
    type: profileType,
    args: {
      id: { type: UUIDType },
    },
  },
  profiles: {
    type: new GraphQLList(profileType),
  },
};
