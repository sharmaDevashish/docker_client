var request = require("request");
var net = require('net'),
JsonSocket = require('json-socket');

const log = require('simple-node-logger').createSimpleLogger('project.log');
var msg;

function createRequest(){
    request("http://www.google.com",function(error,response,body)
        {
            msg = "this is a info message"
            var port = 514; //The same port that the server is listening on
            var host = '10.157.10.117';
            var socket = new JsonSocket(new net.Socket()); //Decorate a standard net.Socket with JsonSocket
            socket.connect(port, host);
            log.info("connected");
            socket.on('connect', function() { //Don't send until we're connected
                socket.sendMessage(JSON.stringify(msg));
                socket.on('message', function(message) {
                    console.log(message);
                });
            });
        }
    );   
}

setInterval(createRequest, 1500);


