module.exports = {
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://budget-app.test',
                changeOrigin: true,
                ws: true,
                onProxyReq: function(request) {
                    request.setHeader("origin", "http://budget-app.test");
                },
            },
        },
    },
}
