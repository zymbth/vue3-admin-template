const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
module.exports = {
	configureWebpack:{
		// externals: {
		// 	'vue': 'Vue',
		// 	'vue-router': 'VueRouter',
		// 	'vuex': 'Vuex',
		// 	'element-plus': 'ElementPlus',
		// 	'axios': 'axios',
		// 	'echarts': 'echarts',
		// 	'xlsx': 'XLSX'
		// },
		plugins: [
			new CompressionWebpackPlugin({
				filename: '[path].gz[query]',
				algorithm: 'gzip',
				test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
				threshold: 10240,
				minRatio: 0.8
			}),
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						// warnings: false,
						drop_debugger: true,
						drop_console: true,
						pure_funcs: ["console.log"]
					}
				},
				sourceMap: false,
				parallel: true
			})
		]
	},
	productionSourceMap: false,
	devServer: {
		port: 9098,
		// proxy: {
        //     '/api': {
        //         target: 'http://10.10.10.57:9000/', //接口域名
        //         changeOrigin: true,             //是否跨域
        //         ws: true,                       //是否代理 websockets
        //         secure: true,                   //是否https接口
        //         pathRewrite: {                  //路径重置
        //             '^/api': ''
        //         }
        //     }
        // }
	},
	publicPath: '/'
	// publicPath: process.env.NODE_ENV === 'production'
	// 	? '/aegicare/erp/'
	// 	: '/'
}