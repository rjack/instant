var http = require('http'),
	util = require('util'),
	io = require('socket.io'),
	server = http.createServer(function(req, res){
			// your normal server code
			res.writeHeader(200, {'Content-Type': 'text/html'});
			res.end('<script type="text/javascript" src="https://github.com/LearnBoost/Socket.IO/raw/master/socket.io.js"></script><h1>Hello world</h1>');
		});
server.listen(8000);

// socket.io
var socket = io.listen(server);
socket.on('connection', function(client){
		console.log("connected", util.inspect(client));
		client.on('message', function(message)
			{
				client.send(message);
			});
		client.on('disconnect', function()
			{
				console.log("disconnected", util.inspect(client));
			});
});
