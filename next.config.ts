import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This project lives inside a parent repo that has its own lockfile + middleware.
  // Pin the workspace root here so Turbopack doesn't pick up the parent's files.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
