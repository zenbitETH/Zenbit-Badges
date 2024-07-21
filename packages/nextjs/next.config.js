// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  env: {
    // @ts-ignore
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    // @ts-ignore
    API_KEY: process.env.API_KEY,
    // @ts-ignore
    JSON_RPC_PROVIDER: process.env.JSON_RPC_PROVIDER,
    PRIVATE_JSON_RPC_PROVIDER: process.env.PRIVATE_JSON_RPC_PROVIDER,
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });
    return config;
  },
  images: {
    domains: ["ipfs.io", "img.icons8.com"],
  },
};

module.exports = nextConfig;
