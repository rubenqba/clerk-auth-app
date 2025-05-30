import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import jwks from 'fastify-jwt-jwks';
import { UserToken } from 'src/models/users';

const plugin = async (fastify: FastifyInstance) => {
  fastify.log.info('Registering Clerk Auth plugin');

  await fastify.register(jwks, {
    jwksUrl: 'https://in-perch-73.clerk.accounts.dev/.well-known/jwks.json',
    issuer: 'https://in-perch-73.clerk.accounts.dev',
    audience: 'api://staging.obseqia.com',
    formatUser: (payload) => {
      fastify.log.debug(payload);
      if (typeof payload !== 'object') {
        return payload;
      }
      const claims = payload as Record<string, unknown>;

      return {
        id: claims.sub as string,
        email: claims.email as string | null,
        email_verified: claims.email_verified as boolean | null,
        family_name: claims.family_name as string | null,
        last_name: claims.last_name as string | null,
        given_name: claims.given_name as string | null,
        phone_number: claims.phone_number as string | null,
        phone_number_verified: claims.phone_number_verified as boolean | null,
        nickname: claims.nickname as string | null,
        picture: claims.picture as string | null,
        roles: claims.roles as string[] | null,
        created_at: claims.created_at as string | null,
        updated_at: claims.updated_at as string | null,
      } as UserToken;
    },
  });

};

const clerkAuthPlugin = fp(plugin, { name: 'clerk-auth', fastify: '5.x' });

export default clerkAuthPlugin;
