import { GraphQLList } from "graphql";
import { memberTypeType } from "../gql_types/memberType.js";
import { UUIDType } from "../gql_types/uuid.js";


export const memberTypeSchemaFields = {
  post: {
    type: memberTypeType,
    args: {
      id: { type: UUIDType },
    },
  },
  posts: {
    type: new GraphQLList(memberTypeType),
  },
};
