/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/expense-tracker', // Remplacez par le nom de votre repo
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig