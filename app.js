/*
 * TODO socket.io must send data only to authenticated clients:
 *      http://bit.ly/gHDJF7
 */
var express  = require("express"),
	io = require('socket.io'),
	querystring = require("querystring"),
	app = express.createServer(),
	analysts = [];


/*
 * Socket.IO setup
 */

var socket = io.listen(app);
socket.on('connection', function(client) {
	analysts.push(client);

	// debug
	console.log("connected");
	client.on('disconnect', function() {
		console.log("disconnected");
	});
});


/*
 * TODO ExpressJS app.use setup (session, cache, gzip, etc.)
 */


var urls = {
	page: "/:page",
	collect: "/collect"
};


/*
 * Helpers
 */

app.dynamicHelpers({
	collect_url: function (req, res) {
		// TODO
	}
});

/*
 * ExpressJS routes
 */

app.get("/", function (req, res) {
	res.redirect(urls.home, 301);
});


/*
 * Tracking pixel (an empty js file, actually)
 */
app.get(urls.collect, function (req, res) {
	var i;
	console.log(req.query);
	res.send("", {"Content-Type": "text/javascript"}, 200);
	for (i = 0; i < analysts.length; i++) {
		analysts[i].send(req.query);
	}
});


app.get(urls.page, function (req, res) {
	res.render("page.jade", {
		locals: {
			page_title: req.params.page
		}
	});
});



app.listen(8000);
