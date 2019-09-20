const AssetConfigWebpackPlugin = require('asset-config-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { ProgressPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const root = process.cwd();

module.exports = {
  context: root,
  entry: {
    main: './src/main.ts',
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({ useTypescriptIncrementalApi: true, eslint: true }),
    new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
    new AssetConfigWebpackPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Stundenzettel',
      inject: true,
      template: './src/index.html',
    }),
    new ScssConfigWebpackPlugin(),
    new ProgressPlugin(),
  ],

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
};
