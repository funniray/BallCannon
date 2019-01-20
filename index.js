const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const raspi = require('raspi');
const Serial = require('raspi-serial').Serial;;

const app = express();

const server = http.createServer(app);
const port = 443;

const wss = new WebSocket.Server({server});

app.use(express.static("public"));

server.listen(port, () => console.log(`Example app listening on port ${port}!`));

raspi.init(() => {
    var serial = new Serial();
    serial.open(() => {
        serial.on('data', (data) => {
            switch (data[0]) {
                case 's':
                    //Do nothing I don't know what to do
                    break;
                default:
                    wss.clients.forEach(function each(client) {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(data);
                        }
                    });
            }
        });
        wss.on('connection',(ws) => {
            ws.on('message',(msg)=> {
                serial.write('p'+msg);
            });
        });
    });
});


wss.on('connection',(ws) => {
    ws.on('message',(msg)=> {
        console.log('Got a message from the client: '+msg);
        ws.send(msg);
    });
});