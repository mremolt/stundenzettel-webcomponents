const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WorkboxPlugin = require('workbox-webpack-plugin');
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin');

const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',

  entry: {
    pwa: './src/pwa.ts',
  },

  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: 'disabled', generateStatsFile: true }),

    new AppManifestWebpackPlugin({
      logo: './src/assets/logo.jpg',
      config: {
        appName: 'Stundenzettel',
        appDescription: 'Bester Stundenzettel',
        start_url: '/',
        display: 'standalone',
        icons: {
          android: true,
          favicons: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
});
