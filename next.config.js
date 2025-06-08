/** @type {import('next').NextConfig} */
const nextConfig = {
  // App directory is now stable in Next.js 14, no experimental flag needed
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://20.189.232.16:8000/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig 