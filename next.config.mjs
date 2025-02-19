/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",  // Enables static export
    images: { unoptimized: true },  // If ya use <Image> component, else it won't work
    trailingSlash: true, // This forces /news/ to serve /news/index.html
};
  
  export default nextConfig;
// MODIFIED TO EXPORT AUTOMATICALLY ON BUILD
// CHECK THE "OUT" FOLDER

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

  