(function (global, io)
{
	var init_done = false,
		self = {},
		paper_width = 500,
		paper_height = 500,
		socket;

	self.init = function ()
	{
		if (!init_done) {
			socket = new io.Socket();
			socket.connect();
			socket.on("message", self.onMessage);

			self.paper = Raphael("paper", paper_width, paper_height);
			self.pages = {};
		}
	};


	self.onMessage = function (msg)
	{
		var name = msg.pageName;
		if (!self.pages[name]) {
			self.pages[name] = 0;
		}
		self.pages[name]++;
		console.log(self.pages);
	};


	self.init();

	global.INSTANT = self;

}(window, io));

(function ()
{
}());
