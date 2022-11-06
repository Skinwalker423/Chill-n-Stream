/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.icons8.com', 'images.unsplash.com', 'i.ytimg.com', 'img.youtube.com']
  },
}

module.exports = nextConfig
