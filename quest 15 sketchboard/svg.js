var http = require("http");
var fs = require("fs");
var querystring = require("querystring");

var express    = require('express');

var app=express();

app.get("/sketchboard.js", function (req, res){
	fs.readFile('sketchboard.js', function (err, data){
		res.writeHead(200, {"Content-Type" : "text/javascript"});
		res.write(data);
		res.end();
	});
});

app.get("/", function (req, res){
	console.log("page start");

	fs.readFile("svg.html", function (err, data){
		res.writeHead(200,{"Content-Type" : "text/html"});
		res.write(data);
		res.end();
	});
});

http.createServer(app).listen(1111, function(){
	console.log("Server is started");
});