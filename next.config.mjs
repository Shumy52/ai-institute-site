/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: false,
  basePath: "/icia-staging",
  ...(process.env.STATIC_BUILD === 'true'
    ? { output: 'export', images: { unoptimized: true } }
    : {}
  ),
};

export default nextConfig;
