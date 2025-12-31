import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  transpilePackages: ["@storysparks/prisma"],
};

export default nextConfig;
