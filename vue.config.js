const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      'element-plus': 'ElementPlus',
      axios: 'axios',
    },
    plugins:
      process.env.NODE_ENV === 'production'
        ? [
            new CompressionWebpackPlugin({
              filename: '[path].gz[query]',
              algorithm: 'gzip',
              test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
              threshold: 10240,
              minRatio: 0.8,
            }),
            new UglifyJsPlugin({
              uglifyOptions: {
                compress: {
                  // warnings: false,
                  drop_debugger: true,
                  drop_console: true,
                  pure_funcs: ['console.log'],
                },
              },
              sourceMap: false,
              parallel: true,
            }),
          ]
        : [],
  },
  chainWebpack: config => {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
  },
  productionSourceMap: false,
  devServer: {
    port: 9098,
  },
  publicPath: './',
}
