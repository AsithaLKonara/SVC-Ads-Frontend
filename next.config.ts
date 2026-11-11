import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: '**.t3.storageapi.dev',
      },
      {
        protocol: 'https',
        hostname: 't3.storageapi.dev',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
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
