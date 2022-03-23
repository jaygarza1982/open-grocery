const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(createProxyMiddleware('/api', { target: 'http://localhost:8010/' }))
    app.use(createProxyMiddleware('/ws', { target: 'http://localhost:8010/' }))
}