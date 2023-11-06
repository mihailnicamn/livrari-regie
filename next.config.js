/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
})

const nextConfig = {
  //disable eslint & typescript check
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
}

module.exports = process.env.NODE_ENV === 'production' ? withPWA(nextConfig) : nextConfig
