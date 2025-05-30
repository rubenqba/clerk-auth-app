import fastifyPlugin from 'fastify-plugin';
import healthRoute from './health';
import protectedRoutes from './protected';

export default fastifyPlugin(async app => {
  app.register(healthRoute, { prefix: '/api' });
  app.register(protectedRoutes, { prefix: '/api' });
});
