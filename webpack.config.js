const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: __dirname + '/src/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: /flexboxgrid/,
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader', // inject CSS to page
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: () => { // post css plugins, can be exported to postcss.config.js
                return [
                  require('precss'),
                  require('autoprefixer'),
                ];
              },
            },
          }, {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build',
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
