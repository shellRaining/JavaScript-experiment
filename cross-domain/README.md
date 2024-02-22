# cross-domain 的一个复现

## 启动项目

首先安装依赖的 `express` 包

```bash
npm install
```

运行项目（需要 node 环境）

```bash
node server.js
```

打开浏览器访问 `http://localhost:5377/` 和 `http://localhost:5378/`，打开 5377 端口相应的浏览器控制台即可看见报错信息
