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
        test: /\.css$/,
        loader: 'style-loader',
        exclude: /flexboxgrid/,
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        exclude: /flexboxgrid/,
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
    ],
  },
  output: {
    filename: 'transformed.js',
    path: __dirname + '/build',
  },
  plugins: [HTMLWebpackPluginConfig],
};
