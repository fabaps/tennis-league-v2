import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images:{
    remotePatterns: [{
      protocol: "https",
      hostname: "www.gstatic.com",
      port: "",
      pathname: "/firebasejs/ui/2.0.0/images/auth/google.svg"
    }]
  }
};

export default nextConfig;
