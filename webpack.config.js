const slsw = require('serverless-webpack')
const path = require('path')
// const nodeExternals = require('webpack-node-externals')

module.exports = {
  devtool: 'source-map',
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  /* externals: [nodeExternals({
    modulesDir: path.resolve(__dirname, './node_modules')
  })], */
  externals: {
    'firebase-admin': 'firebase-admin'
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: __dirname + 'public' }
    ]
  },
  optimization: {
    minimize: false
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs'
  },
  resolve: {
    alias: {
      pg: path.resolve(__dirname, 'doNotRemoveMe'),
      'pg-hstore': path.resolve(__dirname, 'doNotRemoveMe'),
      sqlite3: path.resolve(__dirname, 'doNotRemoveMe'),
      tedious: path.resolve(__dirname, 'doNotRemoveMe')
    },
    extensions: ['.js', '.json', '.ts']
  },
  target: 'node'
}
