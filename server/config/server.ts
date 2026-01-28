export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // 1. The public URL must be absolute and include the subpath
  url: 'https://airi.utcluj.ro/strapi',
  // 2. DELETE the 'admin' block entirely.
  // Strapi will automatically append '/admin' to the url above.
  app: {
    keys: env.array('APP_KEYS'),
  },
  vite: {
    server: {
      allowedHosts: ['solid.utcluj.ro', 'airi.utcluj.ro'],
    },
  },
});