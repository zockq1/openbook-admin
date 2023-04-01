const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://6b8f-182-210-250-64.jp.ngrok.io",
      changeOrigin: true,
    })
  );
};
