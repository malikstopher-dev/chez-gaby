import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "dynamic-media-cdn.tripadvisor.com" },
      { protocol: "https", hostname: "static.tacdn.com" },
    ],
  },
};

export default nextConfig;
