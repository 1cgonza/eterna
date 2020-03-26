const merge = require('webpack-merge');
const { join } = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: join(__dirname, 'public'),
    port: 9000,
    writeToDisk: true
  },
  watchOptions: {
    ignored: ['/node_modules/']
  }
});
