/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: 'i.postimg.cc'
      }
    ]
  },
  reactStrictMode: false,
  webpack: (config) => {
  config.externals.push({
  sharp: "commonjs sharp",
  canvas: "commonjs canvas"
  })
  return config
  },
  }
  
  module.exports = nextConfig