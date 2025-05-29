import { clerkClient, getAuth } from '@clerk/fastify';
import { Authenticate } from 'fastify-jwt-jwks';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

const protectedRoutes: FastifyPluginAsyncZod = async fastify => {

  const authorizationWithManualAudience: Authenticate = async (request) => {
    // PRIMERO: Ejecutar la autenticación JWT
    await fastify.authenticate(request);

    // SEGUNDO: Validar audience manualmente
    const expectedAudience = process.env.JWT_AUDIENCE;
    let tokenAudience: unknown = undefined;
    if (request.user && typeof request.user === 'object' && 'aud' in request.user) {
      // @ts-expect-error: We are asserting the shape here for runtime safety
      tokenAudience = (request.user as object).aud;
    }

    if (!tokenAudience) {
      throw fastify.httpErrors.unauthorized('Missing required audience claim');
    }

    const audienceMatches = Array.isArray(tokenAudience)
      ? tokenAudience.includes(expectedAudience)
      : tokenAudience === expectedAudience;

    if (!audienceMatches) {
      throw fastify.httpErrors.forbidden(`Invalid audience. Expected: ${expectedAudience}, Got: ${tokenAudience}`);
    }
  }

  const authenticateWithClerk: Authenticate = async (request) => {
    // // Primero, autenticamos usando Clerk
    // await fastify.authenticate(request);
    // Luego, obtenemos el usuario autenticado
    const { userId } = getAuth(request);
    if (!userId) {
      throw fastify.httpErrors.unauthorized('User not authenticated');
    }
    fastify.log.info(`Authenticated user ID: ${userId}`);
    // Obtenemos los datos del usuario desde Clerk
    const user = await clerkClient.users.getUser(userId);

    // Asignamos los datos del usuario al request
    request.user = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || null,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      created: user.createdAt,
      updated: user.updatedAt,
    };
  };

  fastify.addHook('preValidation', fastify.authenticate);
  // fastify.addHook('preHandler', authorizationWithManualAudience);
  // fastify.addHook('preHandler', authenticateWithClerk);

  fastify.get(
    '/protected',
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
    async (request, reply) => {
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
};

export default protectedRoutes;
