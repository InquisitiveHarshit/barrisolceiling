import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mongoose"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      // /blogs -> /blog (listing page)
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      // /blogs/[slug] -> /blog-details/[slug]
      {
        source: "/blogs/:slug*",
        destination: "/blog-details/:slug*",
        permanent: true,
      },
      // /services -> /service (listing page)
      {
        source: "/services",
        destination: "/service",
        permanent: true,
      },
      // /services/[slug] -> /service-detail/[slug]
      {
        source: "/services/:slug*",
        destination: "/service-detail/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
