const path = require('path');

module.exports = {
	outputDir:path.resolve(__dirname,'../server/public'),
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				//changOrigin: true,//允许跨域
				// pathRewrite: {
				// 	'^/api':''
				// }
			}
		}
	},
	lintOnSave: false 
};