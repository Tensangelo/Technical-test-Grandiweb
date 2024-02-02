/** @type {import('next').NextConfig} */

import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    sassOptions: {
        includePaths: [path.join(__dirname, '/src/styles')],
    },
    images: {
        domains: [
            'cdn.shopify.com',
        ],
    },
};

export default nextConfig;
