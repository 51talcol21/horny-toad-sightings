import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/horny-toad-sightings', // <- if your GitHub repo is not a custom domain
  trailingSlash: true, // optional, makes URLs more static-host friendly
};

export default nextConfig;
