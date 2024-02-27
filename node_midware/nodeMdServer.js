const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// 设置静态资源
app.use(express.static(__dirname));

// 使用代理
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:5378",
    pathRewrite: {
      "^/api": "",
    },
    changeOrigin: true,
  }),
);

app.listen(5377);
console.log("mid server is running at http://localhost:5377");
