/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  output: 'export',

  basePath: '/visionvisa-demo',

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;