import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import jwks from 'fastify-jwt-jwks';

const plugin = async (fastify: FastifyInstance) => {
  fastify.log.info('Registering Clerk Auth plugin');

  await fastify.register(jwks, {
    jwksUrl: 'https://in-perch-73.clerk.accounts.dev/.well-known/jwks.json',
    issuer: 'https://in-perch-73.clerk.accounts.dev',
    audience: 'api://staging.obseqia.com'
  });

};

const clerkAuthPlugin = fp(plugin, { name: 'clerk-auth', fastify: '5.x' });

export default clerkAuthPlugin;
