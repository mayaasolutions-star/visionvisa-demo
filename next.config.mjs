/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  basePath: '/visionvisa-demo',

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;