import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
    return config
  },
  experimental:{
  serverActions: {
    bodySizeLimit: '2mb',
    allowedOrigins: ["http://localhost:4000"]
  },
  
}
};

export default nextConfig;
