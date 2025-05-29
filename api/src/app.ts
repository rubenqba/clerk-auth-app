import 'dotenv/config';
import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { clerkPlugin } from '@clerk/fastify';
import { healthRoute, protectedRoutes } from './routes';
import clerkAuthPlugin from './plugins/clerkAuth';

const fastify = Fastify({ trustProxy: true, logger: true }).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler).setSerializerCompiler(serializerCompiler);

fastify
  .register(import('@fastify/sensible'))
  .register(clerkPlugin, { audience: 'https://api.obseqia.com' })
  .register(clerkAuthPlugin)
  .register(healthRoute, { prefix: '/api' })
  .register(protectedRoutes, { prefix: '/api' });

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: '0.0.0.0' });
    console.log('API listening on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
