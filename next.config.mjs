// next.config.js
/** @type {import('next').NextConfig} */

// Product images can come from the backend's own host (local /uploads storage) or from
// the R2 CDN — both need to be allow-listed for next/image, or it throws at runtime.
const backendUrl = process.env.NEXT_PUBLIC_ROOT_URL
  ? new URL(process.env.NEXT_PUBLIC_ROOT_URL)
  : null;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shondhibazar.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-130823b228984650a2170b1164794f76.r2.dev",
        port: "",
        pathname: "/**",
      },
      ...(backendUrl
        ? [
            {
              protocol: backendUrl.protocol.replace(":", ""),
              hostname: backendUrl.hostname,
              port: backendUrl.port || "",
              pathname: "/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
