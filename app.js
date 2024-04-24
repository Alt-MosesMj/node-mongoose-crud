var express = require("express");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var path = require("path");
var cors = require("cors");
require('dotenv').config();

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
var PORT = process.env.PORT;

var mongoose = require("mongoose");

mongoose.connect(MONGODB_URL , {serverSelectionTimeoutMS: 5000}).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		app.listen(PORT);
		console.log("Connected to %s", MONGODB_URL);
		console.log('Express app started on port ' + PORT);
		console.log("Press CTRL + C to stop the process. \n");
	}
})
.catch(err => {
  console.error("App starting error:", err.message);
  if (err.stack) {
	console.log('\nStacktrace:')
	console.log('====================')
	console.log(err.stack);
  }
  process.exit(1);
});
var db = mongoose.connection;
var app = express();

// //don't show the log when it is test
// if(process.env.NODE_ENV !== "test") {
// 	app.use(logger("dev"));
// }
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

module.exports = app;

// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
