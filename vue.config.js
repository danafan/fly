module.exports = {	
	devServer: {
		proxy: {
			'/wx': {
				target: 'http://nwwhb.92nu.com',
				ws: true,
				changOlrigin: true,		
			}
		},
		host:"0.0.0.0",  
	},
	// assetsDir: "clothes",
	// publicPath:'../',
}