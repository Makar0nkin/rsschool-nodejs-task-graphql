import { GraphQLNonNull, GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLString } from 'graphql';
import { UUIDType } from "./uuid.js";


export const profileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean)  },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt)  },
    userId: { type: new GraphQLNonNull(UUIDType)  },
    memberTypeId: { type: new GraphQLNonNull(GraphQLString) }
  }),
});