module.exports = {	
	devServer: {
		proxy: {
			'/wx': {
				target: 'http://testhhh.92nu.com',
				ws: true,
				changOlrigin: true,		
			}
		},
		host:"0.0.0.0",  
		port:8088
	},
	// assetsDir: "clothes",
	// publicPath:'../',
}