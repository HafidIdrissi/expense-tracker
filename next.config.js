/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/mon-budget', // IMPORTANT: Remplacez par le nom exact de votre repo
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig