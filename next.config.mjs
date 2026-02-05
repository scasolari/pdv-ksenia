/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pdv-ksenia.s3.eu-west-1.amazonaws.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
