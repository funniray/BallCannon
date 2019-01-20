const express = require('express');
const app = express();
const port = 8081;
const wsPort = 8082;

const WebSocket = require('ws');

const wss = new WebSocket.Server({port:wsPort});

app.use(express.static("public"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

wss.on('connection',(ws) => {
	ws.on('message',(msg)=> {
		console.log('Got a message from the client: '+msg);
		ws.send(msg);
	});
});