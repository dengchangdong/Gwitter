/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BLOG_TITLE: process.env.BLOG_TITLE,
    BLOG_DESCRIPTION: process.env.BLOG_DESCRIPTION,
    AUTHOR_NAME: process.env.AUTHOR_NAME,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
  }
};

export default nextConfig;
