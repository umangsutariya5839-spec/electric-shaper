import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/decoration",
        destination: "/light-decoration",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
