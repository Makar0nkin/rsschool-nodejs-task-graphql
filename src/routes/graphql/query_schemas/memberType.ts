import { GraphQLList, GraphQLString } from "graphql";
import { memberTypeType } from "../gql_types/memberType.js";
import { memberTypeIdType } from "../gql_types/memberTypeId.js";

export const memberTypeSchemaFields = {
  memberType: {
    type: memberTypeType,
    args: {
      id: { type: memberTypeIdType },
    },
  },
  memberTypes: {
    type: new GraphQLList(memberTypeType),
  },
};
