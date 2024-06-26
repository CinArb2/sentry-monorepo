const { withSentryConfig } = require('@sentry/nextjs')

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // An auth token is required for uploading source maps.
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: false, // Suppresses all logs
  ignore: [] // ignore logic that the Sentry SDK does
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(js|mjs)$/,
      enforce: 'pre',
      loader: require.resolve('source-map-loader'),
      exclude: [/node_modules\/@next/, /node_modules\/next/, /node_modules/]
    });
    return config;
  },
  sentry: !process.env.NEXT_PUBLIC_SENTRY_DEBUG && {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
}

// Skip uploading source maps to Sentry every time the app is built locally
module.exports = process.env.NEXT_PUBLIC_SENTRY_DEBUG ? nextConfig : withSentryConfig(nextConfig, sentryWebpackPluginOptions)
