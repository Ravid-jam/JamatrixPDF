import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    esmExternals: 'loose', // Enables loose mode
  },
};

export default nextConfig;
