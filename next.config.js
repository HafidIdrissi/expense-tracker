/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/expense-tracker',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig