/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', // chấp nhận tất cả các hostnames cho HTTP
      },
      {
        protocol: 'https',
        hostname: '**', // chấp nhận tất cả các hostnames cho HTTPS
      },
    ],
  },
};

export default nextConfig;
