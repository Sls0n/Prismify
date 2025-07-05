/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    // domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'prismify.notion.site'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'prismify.notion.site',
          port: '',
          pathname: '/**',
        },
      ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
}

module.exports = nextConfig
