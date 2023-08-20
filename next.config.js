/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: true,
  },

  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
