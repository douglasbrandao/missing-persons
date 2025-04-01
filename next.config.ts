import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3dev.pjc.mt.gov.br',
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
};

export default nextConfig;
