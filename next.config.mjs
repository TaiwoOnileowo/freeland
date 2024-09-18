/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.freepik.com"
      },
      {
        protocol: "https",
        hostname: "img.b2bpic.net"
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
