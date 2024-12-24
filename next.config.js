"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["example.com"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};
exports.default = nextConfig;
