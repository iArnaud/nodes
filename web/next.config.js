const withCSS = require('@zeit/next-css')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.BUNDLE_ANALYZE === 'true'
})
const withOffline = require('next-offline')

module.exports = withBundleAnalyzer(withOffline(withCSS({
  target: 'serverless',
  webpack: (config, { dev }) => {
    config.node = {
      fs: 'empty', // for loki.js
      dns: 'empty' // for dat-archive-web
    }
    return config
  },
  env: {
    HUB_API_URL: process.env.HUB_API_URL
  },
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
})))
