import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['192.168.1.12'],
};

export default nextConfig;
