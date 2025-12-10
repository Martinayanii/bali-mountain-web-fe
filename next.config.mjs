/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Izinkan gambar dari Unsplash
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',       // Izinkan gambar avatar user
      },
    ],
  },
};

export default nextConfig;