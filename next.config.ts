import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public', // Destination directory for the generated service worker
  register: true, // Register the service worker
  skipWaiting: true, // Immediately activate the service worker
  swSrc: './public/service-worker.js', // Path to custom service worker
  // disable: process.env.NODE_ENV === 'development', // Disable in development
  // runtimeCaching: [
  //   {
  //     urlPattern: /^(\/api\/all)$/, // Match your API endpoint
  //     handler: 'NetworkFirst', // Use network first strategy
  //     options: {
  //       cacheName: 'nw-product-cache-v1',
  //       expiration: {
  //         maxEntries: 500,
  //         maxAgeSeconds: 24 * 60 * 60, // 1 day
  //       },
  //       cacheableResponse: {
  //         statuses: [0, 200], // Cache successful responses
  //       },
  //     },
  //   },
  // ],
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'media.istockphoto.com','a.fsimg.co.nz'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    }
    return config;
  },

  async headers() {
    return [
      {
        source: '/service-worker.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          }
        ]
      }
    ];
  }
};

export default withPWA(nextConfig);
