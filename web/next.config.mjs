/** @type {import('next').NextConfig} */

const remotePatterns = [
  // Local dev (host)
  { protocol: 'http', hostname: 'localhost', port: '1337', pathname: '/**' },
  { protocol: 'http', hostname: '127.0.0.1', port: '1337', pathname: '/**' },

  // Docker network (server-to-server)
  { protocol: 'http', hostname: 'strapi', port: '1337', pathname: '/**' },

  // Production (behind Nginx, often under /strapi)
  { protocol: 'https', hostname: 'airi.utcluj.ro', pathname: '/**' },
];

const isStaticBuild = process.env.STATIC_BUILD === 'true';

const nextConfig = {
  trailingSlash: false,
  // basePath: "/icia-staging",
  ...(isStaticBuild ? { output: 'export' } : {}),
  images: {
    remotePatterns,
    ...(isStaticBuild ? { unoptimized: true } : {}),
  },
};

export default nextConfig;
