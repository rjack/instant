var express  = require("express"),
	io = require('socket.io'),
	app = express.createServer();


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
	console.log(req.query);
	res.send("", {"Content-Type": "text/javascript"}, 200);
});


app.listen(8000);



/*
 * Socket.IO setup
 */

var socket = io.listen(app);
socket.on('connection', function(client) {
	console.log("connected");
	client.on('message', function(message) {
		console.log(message);
		client.send(message.toUpperCase());
	});
	client.on('disconnect', function() {
		console.log("disconnected");
	});
});
