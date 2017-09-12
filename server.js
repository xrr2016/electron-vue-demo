const ws = require("nodejs-websocket")
const port = 8000

let clientCount = 0

const broadcast = function (server, msg) {
	server.connections.forEach(function(connection) {
		connection.sendText(msg)
	})
}

const server = ws.createServer(function (conn) {
	clientCount++
	conn.nickname = 'user' + clientCount
	broadcast(server, `${conn.nickname} comes in.`)
  console.log(clientCount)
	conn.on("text", function (msg) {
	  broadcast(server, msg)
	})

	conn.on("close", function (code, reason) {
	  broadcast(server, `${conn.nickname} left.`)
	})
	conn.on("error", function (err) {
		console.log("Error", err)
	})
}).listen(port)

console.log('Websocket server listening on\t' + port)