// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Add this line to enable static export
  async redirects() {
    return [
      {
        source: "/",
        destination: "/index.html",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
