const WebSocket = require('ws')

let wsServer = new WebSocket.Server({ port: 5377 })
wsServer.on('connection', function (ws) {
  ws.on('message', function (data) {
    console.log(data) // 向服务端发送数据
    ws.send('服务端传给你的数据')
  })
})
