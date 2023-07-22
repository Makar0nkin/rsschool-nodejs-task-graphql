import { GraphQLList, GraphQLString } from "graphql";
import { memberTypeType } from "../gql_types/memberType.js";

export const memberTypeSchemaFields = {
  memberType: {
    type: memberTypeType,
    args: {
      id: { type: GraphQLString },
    },
  },
  memberTypes: {
    type: new GraphQLList(memberTypeType),
  },
};
