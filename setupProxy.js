const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // 프록시 서버가 대신할 경로
    createProxyMiddleware({
      target: 'https://omnmm.com', // 대상 서버 URL
      changeOrigin: true,
    })
  );
};
