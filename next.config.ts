import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  cacheLife: {
    default: {
      stale: 10 * 60, // 10 minutes
      revalidate: 10 * 60,
    },
  },
};

export default nextConfig;
