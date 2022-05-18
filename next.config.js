/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        //Temporary added domain to be able to work on the layout
        domains: ['hatrabbits.com'],
    },
};

module.exports = nextConfig;
