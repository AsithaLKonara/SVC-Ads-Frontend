import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/buy',
        destination: '/properties',
        permanent: true,
      },
      {
        source: '/rent',
        destination: '/rentals',
        permanent: true,
      },
      {
        source: '/land',
        destination: '/lands',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/ads',
        permanent: true,
      },
      {
        source: '/listing-rules',
        destination: '/terms',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
