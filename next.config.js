const withReactSvg = require("next-react-svg");
const path = require("path");
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = withReactSvg({
  include: path.resolve(__dirname, "public/assets"),
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        bufferutil: false,
        'utf-8-validate': false,
      };
    }
    return config;
  },
  ReactStrictMode: true,
});
module.exports = nextConfig;
 