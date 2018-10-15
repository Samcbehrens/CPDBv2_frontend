'use strict';
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const srcPath = path.join(__dirname, '/../src');
const context = path.join(__dirname, '../');

module.exports = distFolder => ({
  context: context,
  target: 'web',
  output: {
    path: path.join(__dirname, '..', distFolder),
    filename: 'bundle-[contenthash].js',
    publicPath: '/'
  },
  mode: 'production',
  entry: `${srcPath}/js/index`,
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, '../src/css'), path.resolve(__dirname, '../src/js'), 'node_modules'],
    alias: {
      webworkify: 'webworkify-webpack',
      'mapbox-gl.css': path.resolve(__dirname, '../node_modules/mapbox-gl/dist/mapbox-gl.css'),
      'mapbox-gl': path.resolve(__dirname, '../node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },
  plugins: [
    new CleanWebpackPlugin([distFolder], { root: context }),
    new webpack.EnvironmentPlugin({
      'CPDB_APP_ENV': 'dev'
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle-[contenthash].css',
    })
  ],
  module: {
    noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl\.js$/,
    rules: [
      {
        test: /\.(js)$/,
        include: [path.join(__dirname, '../src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { modules: true } },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
});
