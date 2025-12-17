/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Ajouter les domaines si besoin
  },
};

module.exports = nextConfig;
