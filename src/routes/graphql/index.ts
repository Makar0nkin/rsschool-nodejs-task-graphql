import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, querySchema } from './schemas.js';
import { graphql } from 'graphql';
import { userResolvers } from './resolvers/user.js';
import { postResolvers } from './resolvers/post.js';
import { userSchemaFields } from './query_schemas/user.js';
import { postSchemaFields } from './query_schemas/post.js';

const resolvers = {
  ...userResolvers,
  ...postResolvers,
}

// console.log('QUERY SCHEMA:\t', {
//       ...userSchemaFields,
//       ...postSchemaFields,
//     });
console.log('RESOLVERS:\t', resolvers);

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      return graphql({
        schema: querySchema,
        rootValue: resolvers,
        source: req.body.query,
        contextValue: fastify.prisma
      })
    },
  });
};

export default plugin;
