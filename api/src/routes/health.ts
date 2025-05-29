import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z from 'zod';

const healthRoute: FastifyPluginAsyncZod = async fastify => {
  fastify.get(
    '/health',
    {
      schema: {
        response: {
          default: z.object({
            status: z.literal('ok'),
          }),
        },
      },
    },
    () => ({ status: 'ok' as const })
  );
};

export default healthRoute;
