import 'fastify';
import type { UserToken } from '../../models/users';

declare module 'fastify' {
  interface FastifyContextConfig {
    skipAuth?: boolean;
  }

  interface FastifyRequest {
    user: UserToken;
  }

}
