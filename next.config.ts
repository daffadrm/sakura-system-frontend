import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
        locale: false,
      },
    ];
  },
};

export default nextConfig;
