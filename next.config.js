/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{hostname: "images.unsplash.com"}],
    },
    reactStrictMode: false,
    output: 'standalone',
    async rewrites() {
        return [
        {
            source: '/api/:path*',
            destination: 'http://localhost:3000/api/:path*', // Proxy to Backend
        },
        ]
    },
    api: {
        bodyParser: {
        sizeLimit: '10mb', // Adjust the size limit as needed, for example '10mb'
        },
    },
};

module.exports = nextConfig;
