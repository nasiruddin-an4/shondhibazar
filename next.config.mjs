// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shondhibazar.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
