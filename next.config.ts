import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rank-meme-frontend.vercel.app",
      },
    ],
  },
};

export default nextConfig;
