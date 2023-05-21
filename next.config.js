/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'nlwspacetime.s3.amazonaws.com',
      'nlwspacetime.s3.sa-east-1.amazonaws.com',
    ],
  },
}

module.exports = nextConfig
