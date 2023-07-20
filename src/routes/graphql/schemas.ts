import { Type } from '@fastify/type-provider-typebox';
import { userSchemaFields } from './query_schemas/user.js';
import { postSchemaFields } from './query_schemas/post.js';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

export const querySchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ...userSchemaFields,
      ...postSchemaFields,
    },
  }),
});