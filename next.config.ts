import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
};
module.exports = nextConfig;
export default nextConfig;
