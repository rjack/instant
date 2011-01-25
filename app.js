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


var urls = {
	page: "/:page",
	collect: "/collect"
};


var pages = ["home", "about", "privacy-policy", "terms-of-use", "contact-us", "pricing", "download"];

/*
 * Helpers
 */

app.dynamicHelpers({
});

app.helpers({
	pages: pages
});

/*
 * ExpressJS routes
 */

app.get("/", function (req, res) {
	res.redirect("/home", 301);
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
