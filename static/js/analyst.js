(function (global, io)
{
	var init_done = false,
		self = {},
		socket;


	self.init = function ()
	{
		if (!init_done) {
			socket = new io.Socket();
			socket.connect();
			socket.on("message", self.onMessage);
		}
	};


	self.onMessage = function (msg)
	{
		console.log(msg);
	};


	self.init();

	global.INSTANT = self;

}(window, io));

(function ()
{
}());
