/** @type {import('next').NextConfig} */
const nextConfig = {
  // Default configuration shared between builds
  trailingSlash: false,
    basePath: '/icia-staging', // Subdomain for current production server
  // Conditional configuration based on environment
  ...(process.env.STATIC_BUILD === 'true' ? {
    output: "export",
    images: { unoptimized: true },
  } : {
    // Server-rendered specific config can go here if needed
  })
};



export default nextConfig;
