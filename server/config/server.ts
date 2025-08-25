export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('STRAPI_URL', ''),
  admin: {
    url: env('STRAPI_ADMIN_URL', '/admin'),
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
  vite: {
    server: {
      allowedHosts: ['solid.utcluj.ro'],
    },
  },
});
