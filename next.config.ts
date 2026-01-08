import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "wetransfercashapi.agensic.com",
                pathname: "/**",
            },
        ],
        domains: ['localhost', '127.0.0.1'], // <-- autoriser localhost
    },
};

export default nextConfig;
