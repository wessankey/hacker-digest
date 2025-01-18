import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/src/app/comments.hbs": ["./src/app/comments.hbs"],
  },
};

export default nextConfig;
