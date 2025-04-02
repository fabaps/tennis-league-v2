import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rank-meme-frontend.vercel.app",
      },
      {
        protocol: "https",
        hostname: "memearena.xyz",
      },
    ],
  },
};

export default nextConfig;
