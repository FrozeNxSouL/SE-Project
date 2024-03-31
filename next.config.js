/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{hostname: "images.unsplash.com"}],
    },
    reactStrictMode: false,
    output: 'standalone',
};

module.exports = nextConfig