/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14, no experimental flag needed
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://20.189.232.16:443/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig 