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
app.use(app.router);
app.use(express.staticProvider(__dirname + "/static"));



/*
 * Helpers
 */

app.dynamicHelpers({
});

app.helpers({
	menu: null
});


/*
 * ExpressJS routes
 */

app.get("/", function (req, res) {
	// TODO if logged redirect to /graph
	// TODO if not logged redirect to /login
	res.redirect("/graph", 301);
});


app.get("/signup", function (req, res) {
	// TODO: signup form
	res.redirect("/");
});

app.get("/login", function (req, res) {
	// TODO: login form
	res.redirect("/");
});



// TODO: authentication required
app.get("/graph", function (req, res) {
	res.render("graph.jade", {
		locals: {
			"page_title": "Graph"
		}
	});
});


/*
 * Collect route
 *
 * Grab query string parameters and send back an empy js file.
 * Send data to analysts via real-time socket.
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
