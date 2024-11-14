/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/community/:id',
                destination: '/community/[id]/page.tsx',
            },
        ];
    },
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
