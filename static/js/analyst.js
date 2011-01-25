(function ()
{
	var socket = new io.Socket();
	socket.connect();
	socket.on("message", console.log);
}());
