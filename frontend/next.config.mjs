/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    reactStrictMode: true,
    images: { unoptimized: true },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api.jgrants-portal.go.jp/exp/v1/public/:path*',
        },
      ]
    },
  }
  
  export default nextConfig;