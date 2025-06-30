import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn1.coppel.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images.dzcdn.net',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'archive.org',
        pathname: '/**',
      },
    ]
  },
  output: 'standalone'
};

export default nextConfig;
