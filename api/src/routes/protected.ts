import { clerkClient } from '@clerk/fastify';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

const protectedRoutes: FastifyPluginAsyncZod = async fastify => {

  fastify.addHook('preValidation', fastify.authenticate);

  fastify.get(
    '/token',
    {
      schema: {
        response: {
          default: z.object({
            status: z.literal('ok'),
            user: z.any().optional(), // Adjust based on what user data you want to return
          }),
          '4xx': z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request) => {
      try {
        // const { userId } = getAuth(request);
        // if (!userId) {
        //   return reply.code(401).send({ error: 'User not authenticated' });
        // }
        // fastify.log.info(`Authenticated user ID: ${userId}`);
        // const user = await clerkClient.users.getUser(userId);

        return { status: 'ok' as const, user: request.user || null };
      } catch (error) {
        return { error: (error as Error).message };
      }
    },
  );

  fastify.get(
    '/user',
    {
      schema: {
        response: {
          default: z.object({
            user: z.any().optional(), // Adjust based on what user data you want to return
          }),
          '4xx': z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request) => {
      try {
        fastify.log.info(`Authenticated user ID: ${request.user.id}`);
        const user = await clerkClient.users.getUser(request.user.id);
        return { user };
      } catch (error) {
        return { error: (error as Error).message };
      }
    },
  );
};

export default protectedRoutes;
