import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  remotePatterns:[
    {
      protocol: 'https',
      hostname: 'images.pexels.com',
      port: '',
    },
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      port: '',
    },
    {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
      port: '',
    }
  ]
 }
};

export default nextConfig;
