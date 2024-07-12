/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "grocery-strapi.onrender.com",
                pathname: "**",
            },
            {
                protocol: "http",
                hostname: "localhost",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
