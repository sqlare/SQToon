/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'f.imnyang.xyz',
                port: '',
                pathname: '/Sqlare/WebToon/**/**/**',
            },
        ],
    },
};

export default nextConfig;
