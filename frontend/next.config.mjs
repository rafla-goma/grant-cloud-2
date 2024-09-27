/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
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