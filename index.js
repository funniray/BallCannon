const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);
const port = 443;

const wss = new WebSocket.Server({server});

app.use(express.static("public"));

server.listen(port, () => console.log(`Example app listening on port ${port}!`));

wss.on('connection',(ws) => {
	ws.on('message',(msg)=> {
		console.log('Got a message from the client: '+msg);
		ws.send(msg);
	});
});