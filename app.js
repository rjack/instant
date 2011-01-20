var express  = require("express"),
	io = require('socket.io'),
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


/*
 * ExpressJS routes
 */

app.get("/", function (req, res) {
	res.redirect("/home", 301);
});


app.get("/home", function (req, res) {
	res.render("home.jade", {
		locals: {
			page_title: "Home"
		}
	});
});


/*
 * Tracking pixel (an empty js file, actually)
 */
app.get("/collect", function (req, res) {
	var i;
	console.log(req.query);
	res.send("", {"Content-Type": "text/javascript"}, 200);
	for (i = 0; i < analysts.length; i++) {
		analysts[i].send(req.query);
	}
});


app.listen(8000);
