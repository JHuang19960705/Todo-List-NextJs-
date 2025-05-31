import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* 其他設定 */
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
