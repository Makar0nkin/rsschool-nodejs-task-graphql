import { GraphQLList } from 'graphql';
import { userType } from '../gql_types/user.js';
import { UUIDType } from '../gql_types/uuid.js';
import { SchemaFieldsType } from '../utils/types.js';

export const userSchemaFields: SchemaFieldsType = {
  user: {
    type: userType,
    args: {
      id: { type: UUIDType },
    },
  },
  users: {
    type: new GraphQLList(userType),
  },
}
