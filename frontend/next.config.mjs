/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['res.cloudinary.com'],
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mail.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**'
      }
    ],
  },
  env: {
    SQUARE_APP_ID: "sq0idp-yUoS3szuMW-V0xJXrUVMQw",
    SQUARE_TOKEN: "EAAAFK_MhgmwTTDWuoPRjabTTP-aEKJAr-HjqMHR4V-p_7GscBdmX4SD0_s2OesS",
    SQUARE_LOCATION_ID: "LNYGHVD6G2M5T",
  },
};

export default nextConfig;