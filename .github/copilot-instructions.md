# Copilot Instructions for clerk-auth-app

## Descripción general
Este proyecto es un monorepo. Contiene dos partes principales:
- `/app`: Aplicación web construida con Next.js y React, utilizando Clerk para la autenticación de usuarios. Gestiona el acceso de usuarios mediante login y registro, protegiendo rutas como el dashboard para que solo usuarios autenticados puedan acceder.
- `/api`: API backend construida con Fastify y TypeScript. Utiliza Zod para la validación de datos. El punto de entrada es `src/app.ts` y expone un endpoint `GET /health` que responde `{status: "ok"}` para validar la configuración.

## Tecnologías principales
- Next.js 15 (en `/app`)
- React 19 (en `/app`)
- Clerk (autenticación, en `/app` y `/api`)
- Tailwind CSS (estilos, en `/app`)
- TypeScript (en ambos proyectos)
- Fastify (en `/api`)
- Zod (en `/api`)

## Estructura relevante
- `/app/src/app/page.tsx`: Página principal. Redirige a `/dashboard` si el usuario está autenticado.
- `/app/src/app/dashboard/page.tsx`: Dashboard protegido, solo accesible para usuarios autenticados.
- `/app/src/app/layout.tsx`: Layout global, incluye los botones de inicio de sesión y registro de Clerk.
- `/app/src/middleware.ts`: Middleware de Clerk para proteger rutas.
- `/app/public/`: Archivos estáticos e imágenes.
- `/api/src/app.ts`: Archivo principal del backend. Inicializa Fastify y expone el endpoint `/health`.
- `/api/src/plugins/`: Directorio para plugins de Fastify. Ejemplo: `clerkAuth.ts` para la autenticación Clerk.

## Reglas y convenciones
- Utiliza Clerk para toda la lógica de autenticación y protección de rutas en `/app`.
- El dashboard debe estar protegido: si el usuario no está autenticado, redirigir a la página principal.
- Si el usuario ya está autenticado y accede a la raíz, redirigirlo al dashboard.
- Usa componentes y hooks de Clerk (`ClerkProvider`, `auth`, `SignInButton`, etc.) para la autenticación.
- Mantén el código limpio y modular, siguiendo las mejores prácticas de Next.js y React.
- Utiliza Tailwind CSS para los estilos en `/app`.
- En `/api`, utiliza Fastify para la creación de endpoints y Zod para la validación de datos de entrada y salida.
- Todos los archivos fuente del backend deben estar en `/api/src`.
- Los plugins de Fastify deben estar en `/api/src/plugins`.

## Buenas prácticas
- Prefiere componentes funcionales y hooks en `/app`.
- Mantén la lógica de autenticación centralizada usando Clerk en `/app`.
- Usa TypeScript para tipado estricto en ambos proyectos.
- Sigue la estructura de carpetas de Next.js (app directory) en `/app` y de Fastify en `/api`.
- Centraliza la lógica de autenticación de la API en un plugin en `/api/src/plugins/clerkAuth.ts`.

## Ejemplo de flujo de autenticación
1. Usuario visita `/`:
   - Si está autenticado, redirigir a `/dashboard`.
   - Si no, mostrar la página principal con opciones de login/registro.
2. Usuario visita `/dashboard`:
   - Si no está autenticado, redirigir a `/`.
   - Si está autenticado, mostrar el dashboard.

## Contacto
Para dudas sobre la arquitectura o decisiones de diseño, consulta este archivo o la documentación oficial de Next.js, Clerk, Fastify o Zod.
