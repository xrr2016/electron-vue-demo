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
	const msg = {
		type: 'enter',
		data: `${conn.nickname} comes in.`
	}
	broadcast(server, JSON.stringify(msg))
  console.log(clientCount)
	conn.on("text", function (text) {
	  const msg = {
			type: 'message',
			data: text
		}
	  broadcast(server, JSON.stringify(msg))
	})

	conn.on("close", function (code, reason) {
		const msg = {
			type: 'leave',
			data: `${conn.nickname} left.`
		}
	  broadcast(server, JSON.stringify(msg))
	})
	conn.on("error", function (err) {
		console.log("Error", err)
	})
}).listen(port)

console.log('Websocket server listening on\t' + port)