/* @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'source.boringavatars.com'],
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "source.boringavatars.com",
                port: "",
                pathname: "/",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/",
            },
            {
                protocol: "https",
                hostname: "loremflickr.com",
                port: "",
                pathname: "/",
            },
        ],
    },
};

export default nextConfig;