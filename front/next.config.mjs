/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {

        domains: ['loremflickr.com', 'ipfs.io', 'cloudflare-ipfs.com'] //* Se puede modificar
    },

        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "source.boringavatars.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
            },
        ],
    },

};

export default nextConfig;
