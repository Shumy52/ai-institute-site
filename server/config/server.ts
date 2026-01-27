export default ({ env }) => {
  const publicUrl = env('PUBLIC_URL', '');

  return {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    // 1. The public URL must be absolute and include the subpath
    // Only set 'url' if PUBLIC_URL is defined (e.g. in production)
    ...(publicUrl ? { url: publicUrl } : {}),
    app: {
      keys: env.array('APP_KEYS'),
    },
  };
};