import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, querySchema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import { userResolvers } from './resolvers/user.js';
import { postResolvers } from './resolvers/post.js';
import depthLimit from 'graphql-depth-limit'
import { memberTypeResolvers } from './resolvers/memberType.js';
import { profileResolvers } from './resolvers/profile.js';

const resolvers = {
  ...userResolvers,
  ...postResolvers,
  ...memberTypeResolvers,
  ...profileResolvers,
}

// console.log('QUERY SCHEMA:\t', {
//       ...userSchemaFields,
//       ...postSchemaFields,
//     });
// console.log('RESOLVERS:\t', resolvers);

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
      const errors = validate(querySchema, parse(req.body.query), [depthLimit(5)]);

      if (errors.length > 0) {
        return { errors };
      }

      return graphql({
        schema: querySchema,
        source: req.body.query,
        rootValue: resolvers,
        variableValues: req.body.variables,
        contextValue: fastify.prisma,
      });
    },
  });
};

export default plugin;
