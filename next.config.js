/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{hostname: "images.unsplash.com"}],
    },
    experimental: {
        serverActions: true,
    },
    reactStrictMode: false,
};

module.exports = nextConfig