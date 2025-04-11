import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "trj65tjl-3000.use.devtunnels.ms",
        "dev.ligatenisgt.com",
        "ligatenisgt.com",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        port: "",
        pathname: "/firebasejs/ui/2.0.0/images/auth/google.svg",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
