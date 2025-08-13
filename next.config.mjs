/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  trailingSlash: false,
  basePath: isDev ? '' : '/icia-staging',
  ...(process.env.STATIC_BUILD === 'true'
    ? { output: 'export', images: { unoptimized: true } }
    : {}
  ),
};

export default nextConfig;
