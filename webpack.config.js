// const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');
const Visualizer = require('webpack-visualizer-plugin');
const webpack = require('webpack');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const modName = 'tcb';

module.exports = {
  mode: 'production',
  entry: [
    './dist/index.js'
  ],
  // devtool: 'inline-source-map',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'tcbjs'),
    filename: process.env.NODE_ENV === 'e2e' ? 'e2e/tcb.js' : `${package.version}/${modName}.js`,
    library: modName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.END_POINT': JSON.stringify(process.env.END_POINT)
    }),
    new Visualizer({
      filename: './statistics.html'
    }),
    // new BundleAnalyzerPlugin()
  ]
};