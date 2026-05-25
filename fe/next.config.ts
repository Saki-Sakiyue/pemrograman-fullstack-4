import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org', // Jika pakai Solusi Hotlink dari Sensei tadi
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Jika pakai gambar Unsplash
      },
      {
        protocol: 'https',
        hostname: 'html5up.net',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/9.x/**',
      },
    ],
    dangerouslyAllowLocalIP: true,
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
