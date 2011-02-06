function Page (name)
{
	var self = this;


	self.moveTo = function (x, y)
	{
		self.x = x;
		self.y = y;
	};


	self.move = function (inc_x, inc_y)
	{
		self.x += inc_x;
		self.y += inc_y;
	};


	self.name = name;
	self.vids = {};
	self.visitors = {};
}



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
		var vid = msg.vid,
			name = msg.pageName,
			page;

		if (!self.pages[name]) {
			page = new Page(name);
			page.addVisitor(vid);
			self.pages[name] = page;
			// dispatchEvent ("visitor-added")
		}
		console.log(self.pages);
	};


	self.init();

	global.INSTANT = self;

}(window, io));


(function ()
{
}());
