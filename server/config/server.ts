export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // This is the only one that matters
  url: env('STRAPI_URL', ''), 
  app: {
    keys: env.array('APP_KEYS'),
  },
  vite: {
    server: {
      allowedHosts: ['solid.utcluj.ro'],
    },
  },
});