import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uniq-alpha-assets.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/firebase-messaging-sw.js",
        headers: [
          {
            key: "Service-Worker-Allowed",
            value: "/",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/:locale/manifest.json",
        destination: "/manifest.json",
      },
      {
        source: "/:locale/icons/:path*",
        destination: "/icons/:path*",
      },
    ];
  },
};

export default withNextIntl(
  withPWA({
    dest: "public",
    register: true,
    disable: process.env.NODE_ENV === "development",
  })(nextConfig),
);
