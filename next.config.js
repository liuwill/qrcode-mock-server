const path = require('path')
const glob = require('glob')

const isDebug = false

module.exports = {
  webpack: (config, { buildId, dev }) => {
    // Perform customizations to webpack config
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        use: [
        'isomorphic-style-loader',
        {
          loader: 'emit-file-loader',
          options: {
            name: 'dist/[path][name].[ext]'
          }
        }]
      }, {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader']
      }, {
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', {
            loader: 'css-loader',
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              importLoaders: 2,
              sourceMap: isDebug,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
              // CSS Nano http://cssnano.co/options/
              minimize: !isDebug,
              discardComments: { removeAll: true },
            },
          }, 'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
        ]
      }
    )
    // Important: return the modified config
    return config
  },
  webpackDevMiddleware: config => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config
    return config
  }
}
