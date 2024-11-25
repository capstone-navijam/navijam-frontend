/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: 'standalone',
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.ap-northeast-2.amazonaws.com',
                port: '',
                pathname: '/navijam-bucket/**',
            },
            {
                protocol: 'https',
                hostname: 'navijam-bucket.s3.ap-northeast-2.amazonaws.com',
                port: '',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'example.com',
                port: '',
            },
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ["@svgr/webpack"],
        });

        return config
    }
};

export default nextConfig;
