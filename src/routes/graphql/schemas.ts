import { Type } from '@fastify/type-provider-typebox';
import { GraphQLFloat, GraphQLSchema, GraphQLString, GraphQLObjectType } from 'graphql';
import { iID, iUser } from './utils/interfaces.js';
import { PrismaClient } from '@prisma/client';

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

// var userType = new graphql.GraphQLObjectType({
//   name: "User",
//   fields: {
//     id: { type: graphql.GraphQLString },
//     name: { type: graphql.GraphQLString },
//   },
// })

export const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
})

export interface iUserResponse {
  id: string,
  name: string,
  balance: number
}

export const userSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: async (_, { id }: iID, prisma: PrismaClient): Promise<iUserResponse> => {
          console.log('INNER RESOLVE', id);
        
          const user = await  prisma.user.findUnique({
            where: { id },
          })
          
          return user!
          // return {id, name: 'unknown', balance: 1000}
        }
      }
    }
  })
})